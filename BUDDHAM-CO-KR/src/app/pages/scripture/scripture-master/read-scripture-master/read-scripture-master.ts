import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
  afterNextRender, AfterViewInit, Component,
  computed, effect, inject, Injector, signal, viewChild
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { RsCode } from '@app/core/enums/rs-code';
import { ILoadingState } from '@app/core/interfaces/i-loading-state';
import { IScriptureMasterRead } from '@app/core/interfaces/i-scripture-master-read';
import { AlertService } from '@app/core/services/alert-service';
import { ScriptureService } from '@app/core/services/scripture-service';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-read-scripture-master',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './read-scripture-master.html',
  styleUrl: './read-scripture-master.scss',
})
export class ReadScriptureMaster implements AfterViewInit {

  private scriptureService = inject(ScriptureService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private injector = inject(Injector);
  private alertService = inject(AlertService);

  autosize = viewChild<CdkTextareaAutosize>('autosize');
  currentFont = signal('font-ibm');
  currentFontSize = signal<string>('20px');
  lineSpace = 1.4;

  id = signal<number>(Number(this.route.snapshot.paramMap.get('id')) || 0);

  listUrl = signal<string>(
    this.route.snapshot.queryParamMap.get('returnUrl') || Paths.ScriptureMaster.url
  );

  private data$ = toObservable(this.id).pipe(
    switchMap(id => {
      if (!id) {
        return of<ILoadingState<IScriptureMasterRead>>({
          data: null,
          loading: false,
          error: new Error('잘못된 ID 정보입니다.')
        })
      }

      return this.scriptureService.masterRead(id).pipe(
        map(res => {
          if (res.rsCode === RsCode.Ok)
            return { data: res.rsData, loading: false, error: null }
          return { data: null, loading: false, error: new Error(res.rsMessage) }
        }),
        startWith<ILoadingState<IScriptureMasterRead>>({
          data: null, loading: true, error: null
        }),
        catchError(err => of<ILoadingState<IScriptureMasterRead>>({
          data: null, loading: false, error: err
        }))
      );
    })
  );

  private state = toSignal(this.data$, { initialValue: { data: null, loading: false, error: null } });

  data = computed(() => this.state().data);
  isLoading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  constructor() {
    this.triggerResize();

    effect(() => {
      this.currentFont();
      this.triggerResize();
    });

    effect(() => {
      this.currentFontSize();
      this.triggerResize();
    })
  }

  ngAfterViewInit(): void {
    this.triggerResize();
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.resizeToFitContent(true);
    }, { injector: this.injector });
  }

  onFontChanged(font: string) {
    this.currentFont.set(font);
  }

  onFontSizeChange(size: string) {
    this.currentFontSize.set(size);
  }

  async onDelete(id?: number) {
    if (id === null) {
      this.alertService.openSheet([{
        title: "잘못된 ID 입니다.",
        content: id
      }]);

    }
    const result = await this.scriptureService.masterDelete(id!);

    if (result.rsCode === RsCode.Ok) {
      this.alertService.openSheet([{ title: '삭제완료' }]);
      this.router.navigateByUrl(this.listUrl());
    }
  }

  goBack() {
    this.router.navigateByUrl(this.listUrl());
  }

  // Component에 추가
  getFormattedText(): string {
    const scripture = this.data();
    if (!scripture) return '';
    return `${scripture.title}
            ${scripture.originalTitle ? `(${scripture.originalTitle})` : ''}
      전통:  ${scripture.tradition}
      시기:  ${scripture.period}
      번역:  ${scripture.translator}
      구성:  ${scripture.structureType}
      본문:  ${scripture.memo ? `\n${scripture.memo}` : ''}`.trim();
  }

  // JSON 복사 (개발자용)
  getJsonText(): string {
    return JSON.stringify(this.data(), null, 2);
  }

  // 간단 텍스트 (일반 사용자용)
  getSimpleText(): string {
    const scripture = this.data();
    if (!scripture) return '';

    return `${scripture.title}\n${scripture.memo || ''}`.trim();
  }

  onCopied(success: boolean, type: 'formatted' | 'json' | 'simple' = 'formatted'): void {
    if (success) {
      const typeLabel = {
        formatted: '정리된 형식',
        json: 'JSON 형식',
        simple: '간단한 형식'
      }[type];

      this.alertService.openSheet([{
        title: `${typeLabel}으로 복사완료!`,
        content: this.data()?.title
      }]);
    }
  }
}
