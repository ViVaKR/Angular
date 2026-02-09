import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, AfterViewInit, Component, computed, effect, inject, Injector, signal, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentCategory, CONTENTCATEGORY_OPTIONS } from '@app/core/enums/content-category';
import { PostType, POSTTYPE_OPTIONS } from '@app/core/enums/post-type';
import { RsCode } from '@app/core/enums/rs-code';
import { ILoadingState } from '@app/core/interfaces/i-loading-state';
import { IScriptureContentRead } from '@app/core/interfaces/i-scripture-content-read';
import { AlertService } from '@app/core/services/alert-service';
import { TranscriptionService } from '@app/core/services/transcription-service';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-read-transcription',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './read-transcription.html',
  styleUrl: './read-transcription.scss',
})
export class ReadTranscription implements AfterViewInit {

  title = Paths.ReadTranscription.title;

  private transcriptionService = inject(TranscriptionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private injector = inject(Injector);
  private alertService = inject(AlertService);

  autosize = viewChild<CdkTextareaAutosize>('autosize');
  currentFont = signal('font-ibm');
  currentFontSize = signal<string>('20px');
  lineSpace = 1.4;

  contentCategory = CONTENTCATEGORY_OPTIONS;
  postTypeOption = POSTTYPE_OPTIONS;

  getContentCategory(value?: ContentCategory) {
    return CONTENTCATEGORY_OPTIONS.find(opt => opt.value === value)?.label ?? '미분류';
  }

  getPostType(value?: PostType) {
    return POSTTYPE_OPTIONS.find(opt => opt.value === value)?.label ?? '미분류'
  }

  id = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  listUrl = signal<string>(
    this.route.snapshot.queryParamMap.get('returnUrl') || Paths.ListTranscription.url
  );

  private data$ = toObservable(this.id).pipe(
    switchMap(id => {
      if (!id) {
        return of<ILoadingState<IScriptureContentRead>>({
          data: null,
          loading: false,
          error: new Error('잘못된 ID 정보입니다.')
        });
      }

      return this.transcriptionService.contentRead(id).pipe(
        map(res => {
          if (res.rsCode === RsCode.Ok)
            return { data: res.rsData, loading: false, error: null }
          return { data: null, loading: false, error: new Error(res.rsMessage) }
        }),
        startWith<ILoadingState<IScriptureContentRead>>({
          data: null, loading: true, error: null
        }),
        catchError(err => of<ILoadingState<IScriptureContentRead>>({
          data: null, loading: false, error: err
        }))
      );
    })
  );

  private state = toSignal(this.data$, { initialValue: { data: null, loading: false, error: null } });

  data = computed(() => this.state()?.data);
  isLoading = computed(() => this.state()?.loading);
  error = computed(() => this.state()?.error);

  constructor() {
    this.triggerResize();
    effect(() => {
      this.currentFont();
      this.triggerResize();
    });

    effect(() => {
      this.currentFontSize();
      this.triggerResize();
    });
  }

  ngAfterViewInit(): void {
    this.triggerResize();
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.resizeToFitContent(true);
    }, { injector: this.injector })
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
    const result = await this.transcriptionService.contentDelete(id!);

    if (result.rsCode === RsCode.Ok) {
      this.alertService.openSheet([{ title: '삭제완료' }]);
      this.router.navigateByUrl(this.listUrl());
    }
  }

  goBack() {
    this.router.navigateByUrl(this.listUrl());
  }

  getFormattedText(): string {
    const contents = this.data();
    if (!contents) return '';

    return `${contents.title} \n${contents.scriptureMasterTitle ? `(${contents.scriptureMasterTitle})` : ''}\n
    주석: ${contents.commentary}
    분류: ${contents.contentCategory}
    작가: ${contents.authorPseudonym}
    범주: ${contents.contentCategory}
         ${contents.transcription ? `\n${contents.transcription}` : ''} `.trim();
  }

  // JSON 복사 (개발자용)
  getJsonText(): string {
    return JSON.stringify(this.data(), null, 2);
  }

  // 간단 텍스트 (일반 사용자용)
  getSimpleText(): string {
    const contents = this.data();
    if (!contents) return '';
    return `${contents.title}\n${contents.transcription || ''}`.trim();
  }

  onCopied(success: boolean, type: 'formatted' | 'json' | 'simple' = 'formatted'): void {
    if (success) {
      const typeLabel = {
        formatted: '정리된 형식',
        json: 'JSON 형식',
        simple: '간단한 형식'
      }[type];

      this.alertService.openSheet([
        {
          title: `${typeLabel}으로 복사완료`,
          content: this.data()?.title
        }
      ]);
    }
  }
}
