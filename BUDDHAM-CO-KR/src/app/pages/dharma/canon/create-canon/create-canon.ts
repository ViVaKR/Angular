import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, effect, inject, Injector, input, isDevMode, model, output, signal, viewChild, viewChildren } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { getEnumOptions } from '@app/core/enums/enum-utils';
import { PinOrder, pinOrderLabel } from '@app/core/enums/pin-order';
import { ICanonEntry } from '@app/core/interfaces/dharma/i-canon-schema';
import { AlertService } from '@app/core/services/alert-service';
import { CanonService } from '@app/core/services/dharma/canon-service';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { CANON_FORM_CONFIG } from '@app/forms/form-configs';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { MAINCATEGORY_OPTIONS } from '@app/core/enums/main-category-type';
import { TRADITION_OPTIONS } from '@app/core/enums/tradition';
import { ORIGINAL_LANG_OPTIONS } from '@app/core/enums/original-language';
import { SCRIPTURE_STRUCTURE_TYPE_OPTIONS } from '@app/core/enums/scripture-structure-type';
import { FontSelector } from "@app/shared/font-selector/font-selector";
import { FontSizeSelector } from "@app/shared/font-size-selector/font-size-selector";
import { MatSelectChange } from '@angular/material/select';
import { ScriptureService } from '@app/core/services/dharma/scripture-service';
import { ScriptureMajorCategoryService } from '@app/core/services/dharma/scripture-major-category-service';
import { ScriptureCategoryService } from '@app/core/services/dharma/scripture-category-service';

@Component({
  selector: 'app-create-canon',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle,
    LoadingState,
    ErrorState,
    FontSelector,
    FontSizeSelector
  ],
  templateUrl: './create-canon.html',
  styleUrl: './create-canon.scss',
})
export class CreateCanon {

  title = Paths.CreateCanon.title;

  btnLabel = computed(() => this.data() ? '수정' : '저장');

  public readonly isDevelopment = isDevMode();
  readonly icon = 'post_add';
  readonly service = inject(CanonService);
  readonly scriptureService = inject(ScriptureService);
  readonly majorCategoryService = inject(ScriptureMajorCategoryService);
  readonly minorCategoryService = inject(ScriptureCategoryService);

  readonly excutor = inject(FormCommandExcutorService);
  readonly createForm = inject(GenericFormService<ICanonEntry>);
  readonly injector = inject(Injector);
  readonly alert = inject(AlertService);
  readonly anchorId = input<string>('anchorId');
  readonly userStore = inject(UserStore);

  resetRequested = output<void>();

  data = model<ICanonEntry | null>(null);
  majorCategoryList = computed(() => this.majorCategoryService.list.value() ?? []);
  minorCategoryList = computed(() => this.minorCategoryService.list.value() ?? []);
  scriptureList = computed(() => this.scriptureService.list.value() ?? []);

  // Minor 목록 자동 필터링
  readonly filteredMinorList = computed(() => {

    const majorCode = this.selectedMajorCategory();
    if (!majorCode) return this.minorCategoryList();
    return this.minorCategoryList().filter(x => x.code.startsWith(majorCode));
  });
  // Major 선택값 추적
  readonly selectedMajorCategory = signal<string | null>(null);


  searchText = signal<string>('');
  searchScripture = signal<string>('');

  currentFont = signal('font-ibm');
  currentFontSize = signal('16px');
  rows = signal<number>(10);

  readonly rowNumbers = (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => i + min);

  lineSpace = 1.8;
  autosize = viewChildren<CdkTextareaAutosize>('autosize');
  formDirective = viewChild<FormGroupDirective>('formDirective');

  getPinLabel = pinOrderLabel;
  readonly categoryOptions = MAINCATEGORY_OPTIONS;
  readonly traditionOptions = TRADITION_OPTIONS;
  readonly originalLangOptions = ORIGINAL_LANG_OPTIONS;
  readonly structureTypeOptions = SCRIPTURE_STRUCTURE_TYPE_OPTIONS;

  readonly pinOrderOptions = getEnumOptions(PinOrder);

  readonly isAdmin = computed(() => {
    return this.userStore.userRoles().includes('Admin');
  });

  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          majorCategoryId: data.majorCategoryId,
          minorCategoryCode: data.minorCategoryCode,
          title: data.title,
          chineseTitle: data.chineseTitle,
          originalTitle: data.originalTitle,
          translationPeriod: data.translationPeriod,
          author: data.author,
          translator: data.translator,

          structureDescription: data.structureDescription,
          coverImageUrl: data.coverImageUrl,
          manifestation: data.manifestation,
          details: data.details,
          attachment: data.attachment,
          hierarchyInfo: data.hierarchyInfo,
          location: data.location,
          pinOrder: data.pinOrder,
          commentary: data.commentary,
        });
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

    // major 변경 시 -> minor 초기화
    effect(() => {
      this.selectedMajorCategory(); // 감지
      // this.createForm.form.get('minorCategoryCode')?.setValue(null);
      this.createForm.setValue('minorCagegoryCode', null);
    });
  }

  ngOnInit(): void {
    this.createForm.initialize(CANON_FORM_CONFIG, this.service)
  }

  ngAfterViewInit() {
    this.triggerResize();
    this.createForm.enableField('pinOrder', this.isAdmin());
  }

  // 이벤트 핸들러 - major 선택 시 Code 추출
  onMajorCategorySelectionChange(event: MatSelectChange): void {
    const major = this.majorCategoryList().find(x => x.id === event.value);
    this.selectedMajorCategory.set(major?.code ?? null);
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.forEach(x => x.resizeToFitContent(true));
    }, { injector: this.injector });
  }

  clearSearch() {
    this.searchText.set('');
  }

  // #region 카테고리

  filteredScriptureList = computed(() => {
    const scripture = this.searchScripture().toLowerCase().trim();
    const list = this.scriptureList();
    if (!scripture) return list;
    return list?.filter(x => x.nameKr.includes(scripture));
  });

  clearScriptureSearch() {
    this.searchScripture.set('');
  }

  onSearchScriptureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchScripture.set(input.value);
  }

  onCategorySelectionChange(event: MatSelectChange) {

    const filtered = this.scriptureList().findLast(x => x.id === event.value);
    this.createForm.form.patchValue({
      abbreviation: filtered?.abbr,
      originalTitle: filtered?.originName,
      originalLanguage: filtered?.originLang
    });
  }

  // #endregion

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

  async onDelete(id: number): Promise<void> {
    const result = await this.excutor.excute(
      () => this.service.delete(id),
      {
        success: '삭제 완료'
      }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }

  async onSubmit(event: Event): Promise<void> {

    event.preventDefault();

    const payload = this.createForm.submitValue();
    if (!payload) return;
    const data = this.data();
    const id = data?.id;

    const result = await this.excutor.excute(
      () => id
        ? this.service.createOrUpdate(payload, id)
        : this.service.createOrUpdate(payload),
      {
        success: id ? '수정 완료' : '저장 완료'
      }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }

}
