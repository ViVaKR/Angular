import {
  afterNextRender, AfterViewInit, Component, computed,
  effect, Injector, model, output, signal, viewChild
} from '@angular/core';
import { FormCreateService } from '@app/core/services/form-create-service';
import { SCRIPTURE_PARAGRAPH } from '@app/forms/form-configs';
import { IScriptureParagraph } from '@app/core/interfaces/i-scripture-paragraph';
import { FormGroupDirective } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { ScriptureService } from '@app/core/services/scripture-service';
import { MAINCATEGORY_OPTIONS } from '@app/core/enums/main-category-type';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { FontSelector } from '@app/shared/font-selector/font-selector';
import { FontSizeSelector } from '@app/shared/font-size-selector/font-size-selector';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-create-scripture-paragraph',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FontSelector,
    FontSizeSelector
  ],
  templateUrl: './create-scripture-paragraph.html',
  styleUrl: './create-scripture-paragraph.scss',
})
export class CreateScriptureParagraph implements AfterViewInit {

  mainTitle = 'Scripture Paragraph';
  data = model<IScriptureParagraph | null>(null);
  btnLabel = computed(() => this.data() ? '수정' : '저장');

  resetRequested = output<void>();

  lang = signal<string | null | undefined>(null);

  currentFont = signal('font-ibm');
  currentFontSize = signal<string>('20px');
  rows = signal<number>(3);
  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i => i + min));

  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  readonly lineSpace = 1.8;

  readonly masterList = computed(() => this.scriptureService.masterList.value() ?? []);

  mainCategoryOptions = MAINCATEGORY_OPTIONS;

  constructor(
    private scriptureService: ScriptureService,
    public createForm: FormCreateService,
    private excutor: FormCommandExcutorService,
    private injector: Injector
  ) {
    this.createForm.initialize(SCRIPTURE_PARAGRAPH);
    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          mainCategoryType: data.mainCategoryType,
          scriptureMasterId: data.scriptureMasterId,
          scriptureMasterTitle: data.scriptureMasterTitle,
          book: data.book,
          bookTitle: data.bookTitle,
          chapter: data.chapter,
          chapterTitle: data.chapterTitle,
          section: data.section,
          sectionTitle: data.sectionTitle,
          passage: data.passage,
          passageTitle: data.passageTitle,
          originalContent: data.originalContent,
          content: data.content
        });

        this.setLang(data.scriptureMasterId);
        this.triggerResize();
      }
    });

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
    }, { injector: this.injector });
  }

  onChangeRows(event: MatSelectChange<any>) {
    this.rows.set(event.value)
    this.triggerResize();
  }

  onFontChanged(font: string) {
    this.currentFont.set(font);
  }

  onFontSizeChanged(size: string) {
    this.currentFontSize.set(size);
  }

  resetForm(event: MouseEvent) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

  setLang(event: any) {
    const data = this.masterList().find(item => item.id === event)?.originalLanguage;
    if (data !== null)
      this.lang.set(data);
  }

  async onSubmit(event: MouseEvent) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;

    const data = this.data();
    const id = data?.id;

    let result;
    if (id) {
      // * 수정
      result = await this.excutor.excute(
        () => this.scriptureService.paragraphCreateOrUpdate(payload, id),
        { success: '수정 완료', error: '수정 실패' }
      );
    }
    else {
      // * 신규
      result = await this.excutor.excute(
        () => this.scriptureService.paragraphCreateOrUpdate(payload),
        { success: '저장 완료', error: '저장 실패' }
      );

    }
    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
}
