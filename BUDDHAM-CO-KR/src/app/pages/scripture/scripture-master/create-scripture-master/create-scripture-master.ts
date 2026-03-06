import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, AfterViewInit, Component, computed, effect, inject, Injector, input, model, OnInit, output, signal, viewChild } from '@angular/core';
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
import { SCRIPTURE_MASTER } from '@app/forms/form-configs';
import { SCRIPT_TYPE_OPTIONS } from '@app/core/enums/script-type';
import { SCRIPTURE_COLLECTION_OPTIONS, ScriptureCollection } from '@app/core/enums/scripture-collection';
import { SCRIPTURE_STRUCTURE_TYPE_OPTIONS } from '@app/core/enums/scripture-structure-type';
import { IIdTitleType } from '@app/core/interfaces/i-id-title-type';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { MAINCATEGORY_OPTIONS } from '@app/core/enums/main-category-type';
import { UserStore } from '@app/core/services/user-store';

@Component({
  selector: 'create-scripture-master',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FileUploader,
    FontSelector,
    FontSizeSelector,
    BodyTitle
  ],
  templateUrl: './create-scripture-master.html',
  styleUrl: './create-scripture-master.scss',
})
export class CreateScriptureMaster implements OnInit, AfterViewInit {

  title = '데이터 관리';
  btnLabel = computed(() => this.data() ? '수정' : '저장');
  data = model<IScriptureMaster | null>(null);

  anchorId = input<string>('anchorId');

  icon = 'post_add';

  readonly scriptureService = inject(ScriptureService);
  readonly excutor = inject(FormCommandExcutorService);
  readonly injector = inject(Injector);
  readonly alert = inject(AlertService);

  // ========== 🔥 제네릭 폼 생성 (한 줄!) ==========

  createForm = inject(GenericFormService<IScriptureMaster>);

  // 선수경전 목록
  recommendedList = input<IIdTitleType[]>([]);
  searchText = signal<string>('');
  filteredList = computed(() => {
    const keyword = this.searchText().toLowerCase();
    return this.recommendedList().filter(x =>
      x.title.toLowerCase().includes(keyword)
    );
  });

  resetRequested = output<void>();
  currentFont = signal('font-ibm'); // font-selector
  currentFontSize = signal<string>('16px'); // font-size-selector
  rows = signal<number>(10);
  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i => i + min));
  lineSpace = 1.8;

  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  imageUploader = viewChild<FileUploader>('imageUploader');
  audioUploader = viewChild<FileUploader>('audioUploader');

  mainCategoryOptions = MAINCATEGORY_OPTIONS;
  traditionOptions = TRADITION_OPTIONS;
  originalLang = ORIGINAL_LANG_OPTIONS;
  scriptTypeOptions = SCRIPT_TYPE_OPTIONS;
  structureTypeOptions = SCRIPTURE_STRUCTURE_TYPE_OPTIONS;

  collectionEnum = ScriptureCollection;
  scriptureCollectionOptions = SCRIPTURE_COLLECTION_OPTIONS;

  readonly userStore = inject(UserStore);

  readonly userId = computed(() => {
    return this.userStore.userId()
  });

  constructor() {

    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          userId: data.userId ?? this.userId(),
          title: data.title,
          chineseTitle: data.chineseTitle,
          originalTitle: data.originalTitle,
          originalLanguage: data.originalLanguage,
          scriptType: data.scriptType,
          mainCategoryType: data.mainCategoryType,
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
          prerequisiteScriptureId: data.prerequisiteScriptureId,
          coverImageUrl: data.coverImageUrl,
          audioUrl: data.audioUrl,
          abbreviation: data.abbreviation,
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

  ngOnInit() {
    this.createForm.initialize(SCRIPTURE_MASTER, this.scriptureService);
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
   * 간결한 에러 처리
   */
  async onSubmit(event: MouseEvent) {

    event.preventDefault();

    // 1️⃣ 폼 값 검증
    const payload = this.createForm.submitValue();
    if (!payload) return;

    const data = this.data();
    const id = data?.id;

    const result = await this.excutor.excute(
      () => id
        ? this.scriptureService.masterCreateOrUpdate(payload, id)
        : this.scriptureService.masterCreateOrUpdate(payload),
      {
        success: id ? '수정 완료' : '저장 완료'
        // error 생략 -> Interceptor 메시지 사용
      }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }

  /**
   * 삭제
   */
  async onDelete(id: number): Promise<void> {
    const result = await this.excutor.excute(
      () => this.scriptureService.masterDelete(id),
      {
        success: '삭제 완료'
        // error: '삭제 실패' // 커스텀 메시지 (선택)
      }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
}
