import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, AfterViewInit, Component, computed, effect, inject, Injector, signal, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MAINCATEGORY_OPTIONS, MainCategoryType } from '@app/core/enums/main-category-type';
import { RsCode } from '@app/core/enums/rs-code';
import { ILoadingState } from '@app/core/interfaces/i-loading-state';
import { IScriptureParagraphRead } from '@app/core/interfaces/i-scripture-paragraph-read';
import { AlertService } from '@app/core/services/alert-service';
import { ScriptureService } from '@app/core/services/scripture-service';
import { Paths } from '@app/data/menu-data';
import { FontSelector } from '@app/shared/font-selector/font-selector';
import { FontSizeSelector } from '@app/shared/font-size-selector/font-size-selector';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-read-scripture-paragraph',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FontSelector,
    FontSizeSelector
  ],
  templateUrl: './read-scripture-paragraph.html',
  styleUrl: './read-scripture-paragraph.scss',
})
export class ReadScriptureParagraph implements AfterViewInit {

  private scriptureService = inject(ScriptureService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private injector = inject(Injector);

  autosize = viewChild<CdkTextareaAutosize>('autosize');
  currentFont = signal('font-ibm');
  currentFontSize = signal<string>('20px');
  lineSpace = 1.4;

  id = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  listUrl = signal<string>(
    this.route.snapshot.queryParamMap.get('returnUrl') || Paths.HomeScripture.url
  );


  private data$ = toObservable(this.id).pipe(

    switchMap(id => {
      if (!id) {
        return of<ILoadingState<IScriptureParagraphRead>>({
          data: null,
          loading: false,
          error: new Error("잘못된 ID 정보입니다.")
        });
      }

      return this.scriptureService.paragraphReadWithMaster(id).pipe(
        map(res => {
          if (res.rsCode === RsCode.Ok)
            return { data: res.rsData, loading: false, error: null };
          return { data: null, loading: false, error: new Error(res.rsMessage) };
        }),
        startWith<ILoadingState<IScriptureParagraphRead>>({ data: null, loading: true, error: null }),
        catchError(err => of<ILoadingState<IScriptureParagraphRead>>({
          data: null, loading: false, error: err
        }))
      );
    })
  );

  private state = toSignal(this.data$, {
    initialValue: { data: null, loading: false, error: null }
  });

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

  ngAfterViewInit() {
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

  onFontSizeChanged(size: string) {
    this.currentFontSize.set(size);
  }

  async onDelete(id?: number) {

    if (id === null) {
      this.alertService.openSheet([{
        title: '잘못된 ID 정보입니다.',
        content: id
      }]);
    }

    const result = await this.scriptureService.paragraphDelete(id!);

    if (result.rsData === RsCode.Ok) {
      this.alertService.openSheet([{
        title: `(${result.rsCode} 삭제되었습니다)`
      }]);
      this.router.navigate(['/Scripture/Paragraph'])
    }
  }

  goBack() {
    this.router.navigateByUrl(this.listUrl());
  }

}
