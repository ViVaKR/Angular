import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TruncatePipe } from '@app/core/pipes/slice-pipe-pipe';
import { UserStore } from '@app/core/services/user-store';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';
import { MATERIAL_COMMON } from '../imports/material-imports';
import { IThreadable } from '../thread-board/thread-board';
import { ILikeResponse } from './interfaces/i-like-response';
import { IReply } from './interfaces/i-reply';

@Component({
  selector: 'reply-board',
  imports: [CommonModule, ...MATERIAL_COMMON, TruncatePipe],
  templateUrl: './reply-board.html',
  styleUrl: './reply-board.scss',
})
export class ReplyBoard<
  T extends IThreadable,
  U extends IReply,
  R extends ILikeResponse> {

  private baseUrl = environment.apiUrl;
  private destroyRef = inject(DestroyRef);
  readonly userStore = inject(UserStore);
  readonly myAvatar = this.userStore.avatar();

  // ✅ Input 시그널 제너릭 적용
  rootItem = input.required<T>();
  parentTitle = input<string>();

  // ✅ 외부에서 주입받는 함수들 (서비스 의존성 제거)
  fetchRepliesFn = input.required<(rootId: number | string) => string>();
  createCommentFn = input.required<(root: T, content: string) => Observable<U>>();
  createReplyFn = input.required<(target: U, content: string) => Observable<U>>();
  toggleLikeFn = input.required<(id: number | string) => Observable<R>>();
  getAvatarUrlFn = input<(reply: U) => string>();

  // ✅ 답글 작성 대상 - U 제너릭
  readonly replyTarget = signal<U | null>(null);
  readonly replyContent = signal<string>('');
  readonly commentFocused = signal<boolean>(false);
  readonly commentContent = signal<string>('');

  // ✅ 좋아요 처리 - id 타입도 제너릭
  readonly likingIds = signal<Set<number | string>>(new Set());
  readonly localReplies = signal<U[]>([]);

  readonly replyCount = computed(() => {
    const root = this.rootItem() as any;
    return root?.replyCount ?? this.localReplies().length;
  });

  readonly sortedReplies = computed(() => {
    const flat = this.localReplies();
    if (!flat.length) return [];

    const result: U[] = [];

    const appendChildren = (parentId: number | string) => {
      const children = flat.filter((x) => x.parentId === parentId);
      for (const child of children) {
        result.push(child);
        appendChildren(child.id);
      }
    };

    const roots = flat.filter((x) => !x.parentId);
    for (const root of roots) {
      result.push(root);
      appendChildren(root.id);
    }

    return result;
  });

  // ✅ httpResource - fetchRepliesFn 을 통해 URL 생성
  readonly repliesResource = httpResource<U[]>(() => {
    const item = this.rootItem();
    const fn = this.fetchRepliesFn();
    if (!item?.id || !fn) return undefined;
    return fn(item.id);
  });

  readonly replies = this.localReplies;
  readonly isLoading = this.repliesResource.isLoading;
  readonly defaultAvatar = `${this.baseUrl}/Images/avatars/buddha.png`;

  constructor() {
    effect(() => {
      const data = this.repliesResource.value();
      if (data) this.localReplies.set(data);
    });
  }

  // ✅ 아바타 - 외부 fn 우선, 없으면 기본 동작
  getUserAvatar(reply?: U): string {
    const customFn = this.getAvatarUrlFn();
    if (customFn && reply) return customFn(reply);

    const userId = reply?.userId;
    const avatar = reply?.avatar;
    if (avatar == null) return this.defaultAvatar;
    return `${this.baseUrl}/Images/avatars/${userId}/${avatar}`;
  }

  onLikeClick(item: U): void {
    const id = item.id;
    if (this.likingIds().has(id)) return;
    this.likingIds.update((set) => new Set(set).add(id));

    const currentReplies = this.localReplies();

    // ✅ 낙관적 업데이트
    const optimistic = currentReplies.map((x) =>
      x.id === id
        ? {
          ...x,
          isLikedByMe: !x.isLikedByMe,
          likeCount: x.isLikedByMe ? x.likeCount - 1 : x.likeCount + 1,
        }
        : x,
    );
    this.localReplies.set(optimistic);

    this.toggleLikeFn()(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: R) => {
          this.localReplies.update((replies) =>
            replies.map((x) =>
              x.id === id ? { ...x, isLikedByMe: res.isLiked, likeCount: res.likeCount } : x,
            ),
          );
          this.likingIds.update((set) => {
            const next = new Set(set);
            next.delete(id);
            return next;
          });
        },
        error: () => {
          this.localReplies.set(currentReplies);
          this.likingIds.update((set) => {
            const next = new Set(set);
            next.delete(id);
            return next;
          });
        },
      });
  }

  onReplyClick(item: U): void {
    this.replyTarget.set(this.replyTarget()?.id === item.id ? null : item);
    this.replyContent.set('');
  }

  submitReply(): void {
    const target = this.replyTarget();
    const content = this.replyContent().trim();
    if (!target || !content) return;

    this.createReplyFn()(target, content)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.replyTarget.set(null);
          this.replyContent.set('');
          this.repliesResource.reload();
        },
        error: (err) => console.error('답글 등록 실패:', err),
      });
  }

  submitComment(): void {
    const root = this.rootItem();
    const content = this.commentContent().trim();
    if (!content) return;

    this.createCommentFn()(root, content)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.commentContent.set('');
          this.commentFocused.set(false);
          this.repliesResource.reload();
        },
        error: (err) => console.error('댓글 등록 실패:', err),
      });
  }
}
