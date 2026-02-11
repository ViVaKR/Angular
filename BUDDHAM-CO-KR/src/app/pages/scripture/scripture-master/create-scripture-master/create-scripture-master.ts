import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, AfterViewInit, Component, computed, effect, inject, Injector, input, model, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { IScriptureMaster } from '@app/core/interfaces/i-scripture-master';
import { ORIGINAL_LANG_OPTIONS } from '@app/core/enums/original-language';
import { TRADITION_OPTIONS } from '@app/core/enums/tradition';
import { FileUploader } from "@app/shared/file-uploader/file-uploader";
import { AlertService } from '@app/core/services/alert-service';
import { FontSelector } from "@app/shared/font-selector/font-selector";
import { FontSizeSelector } from "@app/shared/font-size-selector/font-size-selector";
import { ScriptureService } from '@app/core/services/scripture-service';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { MatSelectChange } from '@angular/material/select';
import { FormCreateService } from '@app/core/services/form-create-service';
import { SCRIPTURE_MASTER } from '@app/forms/form-configs';
import { SCRIPT_TYPE_OPTIONS } from '@app/core/enums/script-type';
import { SCRIPTURE_COLLECTION_OPTIONS, ScriptureCollection } from '@app/core/enums/scripture-collection';
import { SCRIPTURE_STRUCTURE_TYPE_OPTIONS } from '@app/core/enums/scripture-structure-type';
import { IIdTitleType } from '@app/core/interfaces/i-id-title-type';

@Component({
  selector: 'create-scripture-master',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FileUploader,
    FontSelector,
    FontSizeSelector,
  ],
  templateUrl: './create-scripture-master.html',
  styleUrl: './create-scripture-master.scss',
})
export class CreateScriptureMaster implements AfterViewInit {

  btnLable = computed(() => this.data() ? '수정' : '저장');
  data = model<IScriptureMaster | null>(null);

  // 선수경전 목록
  recommendedList = input<IIdTitleType[]>([]);
  searchText = signal<string>('');
  filteredList = computed(() => {
    const keyword = this.searchText().toLowerCase();
    return this.recommendedList().filter(x =>
      x.title.toLowerCase().includes(keyword)
    );
  });

  alert = inject(AlertService);
  resetRequested = output<void>();
  currentFont = signal('font-ibm'); // font-selector
  currentFontSize = signal<string>('16px'); // font-size-selector
  rows = signal<number>(3);
  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i => i + min));
  lineSpace = 1.8;

  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  imageUploader = viewChild<FileUploader>('imageUploader');
  audioUploader = viewChild<FileUploader>('audioUploader');

  traditionOptions = TRADITION_OPTIONS;
  originalLang = ORIGINAL_LANG_OPTIONS;
  scriptTypeOptions = SCRIPT_TYPE_OPTIONS;
  structureTypeOptions = SCRIPTURE_STRUCTURE_TYPE_OPTIONS;

  collectionEnum = ScriptureCollection;
  scriptureCollectionOptions = SCRIPTURE_COLLECTION_OPTIONS;

  constructor(
    private scriptureService: ScriptureService,
    public createForm: FormCreateService,
    private excutor: FormCommandExcutorService,
    private injector: Injector
  ) {

    this.createForm.initialize(SCRIPTURE_MASTER);

    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          title: data.title,
          originalTitle: data.originalTitle,
          originalLanguage: data.originalLanguage,
          scriptType: data.scriptType,
          tradition: data.tradition,
          period: data.period,
          author: data.author,
          translator: data.translator,
          translationPeriod: data.translationPeriod,
          structureType: data.structureType,
          structureDescription: data.structureDescription,
          collection: data.collection,
          totalVolumes: data.totalVolumes,
          totalChapters: data.totalChapters,
          totalSections: data.totalSections,
          totalVerses: data.totalVerses,
          difficultyLevel: data.difficultyLevel,
          recommendedOrder: data.recommendedOrder,
          estimatedMinutes: data.estimatedMinutes,
          coverImageUrl: data.coverImageUrl,
          audioUrl: data.audioUrl,
          memo: data.memo
        });
        this.triggerResize();
      }
    });

    //  font 변경 감지
    effect(() => {
      this.currentFont(); // 의존성 추적
      this.triggerResize();
    });

    effect(() => {
      this.currentFontSize(); // 의존성 추적
      this.triggerResize();
    });
  }

  ngAfterViewInit() {
    this.triggerResize();
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.resizeToFitContent(true);
    }, { injector: this.injector });
  }

  clearSearch() {
    this.searchText.set('');
  }
  onChangeRows(event: MatSelectChange<any>) {
    this.rows.set(event.value);
    this.triggerResize();
  }

  // * font-selector - 단순히 siganl 만 업데이트
  onFontChanged(font: string) {
    this.currentFont.set(font);
  }

  // * font-size-selector - 단순히 signal 만 업데이트
  onFontSizeChanged(size: string) {
    this.currentFontSize.set(size);
  }

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

  onImageUploaded(fileUrl: string): void {
    this.createForm.form.patchValue({
      coverImageUrl: fileUrl
    });
    this.alert.openSheet([{
      title: '커버 이미지 업로드 완료',
      content: fileUrl
    }]);
  }

  /**
   * 오디오 파일 업로드 완료 핸들러
   * @param fileUrl void
   */
  onAudioUploaded(fileUrl: string): void {
    this.createForm.form.patchValue({
      audioUrl: fileUrl
    });

    this.alert.openSheet([{
      title: '오디오 파일 업로드 완료',
      content: fileUrl
    }]);

  }

  /**
   * 이미지 업로드 트리거
   */
  triggerImageUpload(): void {
    this.imageUploader()?.openFilePicker();
  }

  /**
   * 오디오 업로드 트리거
   */
  triggerAudioUpload(): void {
    this.audioUploader()?.openFilePicker();
  }

  /**
   * 폼 제출
   * @param event MouseEvent
   * @returns void
   */
  async onSubmit(event: MouseEvent) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;
    const data = this.data();
    const id = data?.id;
    let result;
    if (id) {
      result = await this.excutor.excute(
        () => this.scriptureService.masterCreateOrUpdate(payload, id),
        { success: '수정 완료', error: '수정 실패' }
      )
    } else {
      result = await this.excutor.excute(
        () => this.scriptureService.masterCreateOrUpdate(payload),
        { success: '저장 완료', error: '저장 실패' }
      )
    }

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
}
