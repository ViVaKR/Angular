import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { RsCode } from '@app/core/enums/rs-code';
import { IQna, IQnaCreateOrUpdate } from '@app/core/interfaces/i-qna';
import { AlertService } from '@app/core/services/alert-service';
import { QnaService } from '@app/core/services/qna-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { finalize } from 'rxjs';
import { ThreadBoard } from "@app/shared/thread-board/thread-board";

@Component({
  selector: 'app-qna-detail',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    ThreadBoard
  ],
  templateUrl: './qna-detail.html',
  styleUrl: './qna-detail.scss',
})
export class QnaDetail {

  private destroyRef = inject(DestroyRef);
  readonly service = inject(QnaService);
  readonly userStore = inject(UserStore);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly alert = inject(AlertService);

  // 🔥 라우트에서 id 받기
  readonly id = signal<number>(Number(
    this.route.snapshot.paramMap.get('id')
  ) || 1);

  readonly listUrl = signal<string>(
    this.route.snapshot.queryParamMap.get('returnUrl') ||
    Paths.QnaMirrorOfMind.url
  );

  // 🔥 상태
  readonly item = signal<IQna | null>(null);
  readonly isLoading = signal(false);
  readonly isEditing = signal(false);
  readonly editContent = signal('');
  readonly editTitle = signal('');
  readonly isDeleting = signal(false);

  // 🔥 권한 체크
  readonly isOwner = computed(() => {
    const item = this.item();
    const userId = this.userStore.userId();
    return item?.userId === userId;
  });

  readonly isAdmin = computed(() => this.userStore.isAdmin());

  readonly canManage = computed(() => this.isOwner() || this.isAdmin());

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) this.loadItem(id);
    })
  }

  loadItem(id: number): void {

    console.log('-->', id);
    this.isLoading.set(true);
    this.service.getQnaById(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: res => this.item.set(res.rsData),
        error: () => this.router.navigate(['/not-fount'])
      });
  }

  // 🔥 수정 모드 진입
  startEdit(): void {
    const item = this.item();
    if (!item) return;
    this.editTitle.set(item.title ?? '');
    this.editContent.set(item.content);
    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  async submitEdit() {
    const item = this.item();
    if (!item) return;

    const dto: IQnaCreateOrUpdate = {
      id: item.id as number,
      title: this.editTitle(),
      content: this.editContent()
    }

    const result = await this.service.qnaCreateOrUpdate(dto, item.id as number);

    if (result.rsCode === RsCode.Ok) {
      this.alert.openSheet([{ title: '편집수정 완료' }]);
      this.router.navigateByUrl(this.listUrl());
    }
  }

  // 🔥 삭제
  confirmDelete(): void {
    this.isDeleting.set(true);
  }

  cancelDelete(): void {
    this.isDeleting.set(false);
  }

  async submitDelete() {
    const item = this.item();
    if (!item) return;

    const result = await this.service.deleteQna(item.id as number)

    if (result.rsCode === RsCode.Ok) {
      this.alert.openSheet([{ title: '삭제 완료!' }]);
      this.router.navigateByUrl(this.listUrl());
    }
  }

  // 🔥 좋아요
  onLikedClick(): void {
    const item = this.item();
    if (!item) return;

    // 좋아요 업데이트
    this.item.update(prev => prev

      ? {
        ...prev,
        isLikedByMe: !prev.isLikedByMe,
        likeCount: prev.isLikedByMe ? prev.likeCount - 1 : prev.likeCount + 1
      }
      : prev
    );

    this.service.toggleLike(item.id as number)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.item.update(prev => prev
            ? { ...prev, isLikedByMe: res.isLiked, likeCount: res.likeCount }
            : prev
          );
        },
        error: () => {
          // 롤백
          this.item.set(item);
        }
      });
  }

  goList() {
    this.router.navigateByUrl(this.listUrl());
  }

}
