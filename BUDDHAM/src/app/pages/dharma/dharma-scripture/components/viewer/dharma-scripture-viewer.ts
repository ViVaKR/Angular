import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IDharmaScriptureView } from '@app/core/interfaces/dharma/i-scripture';
import { AlertService } from '@app/core/services/alert-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { finalize } from 'rxjs';
import { DharmaScriptureService } from '../../services/dharma-scripture';

@Component({
  selector: 'app-dharma-scripture-viewer',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './dharma-scripture-viewer.html',
  styleUrl: './dharma-scripture-viewer.scss',
})
export class DharmaScriptureViewer {

  private destroyRef = inject(DestroyRef);
  readonly service = inject(DharmaScriptureService);
  readonly userStore = inject(UserStore);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly alert = inject(AlertService);

  // id 받기
  readonly id = signal<number>(Number(this.route.snapshot.paramMap.get('id')));
  readonly listUrl = signal<string>(this.route.snapshot.queryParamMap.get('returnUrl') || Paths.Dharma.url);

  // 상태
  readonly item = signal<IDharmaScriptureView | null>(null);
  readonly isLoading = signal(false);
  readonly isEditig = signal(false);
  readonly idDeleting = signal(false);

  readonly isAdmin = computed(() => this.userStore.isAdmin());
  readonly canManage = computed(() => this.isAdmin());

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) this.loadItem(id);

    });
  }

  loadItem(id: number): void {

    this.isLoading.set(true);
    this.service.getById(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      ).subscribe({
        next: res => this.item.set(res.rsData!),
        error: () => this.router.navigate(['/not-fount'])
      });
  }

  // 수정 모드
  startEdit(): void {
    const item = this.item();
    if (!item) return;
    this.isEditig.set(true);
  }

  cancelEit(): void {
    this.isEditig.set(false);
  }

  async submitEdit(): Promise<void> {

    const item = this.item();
    if (!item) return;

    // const dto: IDharmaScriptureUpdate = {

    // }

  }



}
