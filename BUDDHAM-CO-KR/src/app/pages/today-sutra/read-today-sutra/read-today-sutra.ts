import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, inject, Injector, signal, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { RsCode } from '@app/core/enums/rs-code';
import { ILoadingState } from '@app/core/interfaces/i-loading-state';
import { ITodaySutra } from '@app/core/interfaces/i-today-sutra';
import { AlertService } from '@app/core/services/alert-service';
import { TodaySutraService } from '@app/core/services/today-sutra-service';
import { UserService } from '@app/core/services/user-service';
import { UserStore } from '@app/core/services/user-store';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { FontSelector } from "@app/shared/font-selector/font-selector";
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FontSizeSelector } from "@app/shared/font-size-selector/font-size-selector";

@Component({
  selector: 'app-read-today-sutra',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FontSelector,
    FontSizeSelector
  ],
  templateUrl: './read-today-sutra.html',
  styleUrl: './read-today-sutra.scss',
})
export class ReadTodaySutra {

  private todaySutraService = inject(TodaySutraService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private userService = inject(UserService);
  private userStore = inject(UserStore);
  private injector = inject(Injector)

  autosize = viewChild<CdkTextareaAutosize>('autosize');
  currentFont = signal('font-ibm');
  currentFontSize = signal<string>('20px');
  lineSpace = 1.8;

  id = signal<number>(Number(this.route.snapshot.paramMap.get('id')) || 0);

  listUrl = signal<string>(
    this.router.currentNavigation()?.extras.state?.['returnUrl'] || '/TodaySutra/HomScripture'
  );

  private data$ = toObservable(this.id).pipe(
    switchMap(id => {
      if (!id) {
        return of<ILoadingState<ITodaySutra>>({
          data: null,
          loading: false,
          error: null
        });
      }

      return this.todaySutraService.read(id).pipe(
        map(response => {
          if (response?.rsCode === RsCode.Ok)
            return { data: response.rsData, loading: false, error: null };
          return { data: null, loading: false, error: new Error('데이터를 불러올 수 없습니다.') };
        }),
        startWith<ILoadingState<ITodaySutra>>({ data: null, loading: true, error: null }),
        catchError(err => of<ILoadingState<ITodaySutra>>({ data: null, loading: false, error: err }))
      );
    })
  );

  private state = toSignal(this.data$, {
    initialValue: { data: null, loading: false, error: null }
  });

  data = computed(() => this.state().data);
  isLoading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  userAvatar = (userId: string) => this.userService.getUserAvatarById(userId, this.data()?.avatar)

  ngAfterViewInit() {
    const autosizeElement = this.autosize();
    if (autosizeElement) {
      autosizeElement.resizeToFitContent(true);
    }
  }

  triggerResize() {
    afterNextRender(() => {
      const autosizeElement = this.autosize();
      if (autosizeElement) {
        autosizeElement.resizeToFitContent(true);
      }
    }, { injector: this.injector, });
  }

  onFontChanged(font: string) {
    this.currentFont.set(font);
  }

  onFontSizeChanged(size: string) {
    this.currentFontSize.set(size);
  }

  isMySutra(userId?: string) {
    return this.userStore.user()?.id === userId;
  }

  async onDelete(id?: number) {
    if (id === null) {
      this.alertService.openSheet([{
        title: '잘못된 ID 정보입니다.',
        content: id
      }]);
    }
    const result = await this.todaySutraService.delete(id!);
    if (result.rsCode === RsCode.Ok) {
      this.alertService.openSheet([{
        title: `(${result.rsCode}) 삭제되었습니다.`,
      }]);
      this.router.navigate(['/MemberShip/TodaySutra']);
    }
  }

  goBack() {
    this.router.navigateByUrl(this.listUrl());
  }
}
