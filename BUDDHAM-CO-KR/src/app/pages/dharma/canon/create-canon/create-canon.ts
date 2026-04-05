// #region Imports

import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  isDevMode,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { getEnumOptions } from '@app/core/enums/enum-utils';
import { PinOrder, pinOrderLabel } from '@app/core/enums/pin-order';
import { ICanonEntry } from '@app/core/interfaces/dharma/i-canon-schema';
import { AlertService } from '@app/core/services/alert-service';
import { CanonService } from '@app/core/services/dharma/canon-service';
import { ScriptureCategoryService } from '@app/core/services/dharma/scripture-category-service';
import { ScriptureMajorCategoryService } from '@app/core/services/dharma/scripture-major-category-service';
import { ScriptureService } from '@app/core/services/dharma/scripture-service';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { CANON_FORM_CONFIG } from '@app/forms/form-configs';
import { BodyTitle } from '@app/shared/body-title/body-title';
import { ErrorState } from '@app/shared/error-state/error-state';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { LoadingState } from '@app/shared/loading-state/loading-state';

// #endregion

@Component({
  selector: 'app-create-canon',
  imports: [CommonModule, ...MATERIAL_COMMON, BodyTitle, LoadingState, ErrorState],
  templateUrl: './create-canon.html',
  styleUrl: './create-canon.scss',
})
export class CreateCanon {
  title = Paths.CreateCanon.title;

  readonly isDevelopment = isDevMode();
  readonly icon = 'post_add';
  readonly lineSpace = 1.8;
  readonly getPinLabel = pinOrderLabel;
  readonly pinOrderOptions = getEnumOptions(PinOrder);

  // --- viewChild ---
  formDirective = viewChild<FormGroupDirective>('formDirective');

  // --- output ---
  resetRequested = output<void>();

  // --- model ---
  data = model<ICanonEntry | null>(null);

  /* inject */
  readonly service = inject(CanonService);
  readonly scriptureService = inject(ScriptureService);
  readonly majorCategoryService = inject(ScriptureMajorCategoryService);
  readonly minorCategoryService = inject(ScriptureCategoryService);
  readonly excutor = inject(FormCommandExcutorService);
  readonly createForm = inject(GenericFormService<ICanonEntry>);
  readonly alert = inject(AlertService);
  readonly anchorId = input<string>('anchorId');
  readonly userStore = inject(UserStore);

  /* signal */
  readonly selectedMajorCategory = signal<string | null>(null);

  searchText = signal<string>('');
  searchScripture = signal<string>('');
  readonly currentFont = signal('font-ibm');
  readonly currentFontSize = signal('16px');
  readonly rows = signal<number>(10);

  /* computed */
  btnLabel = computed(() => (this.data() ? '수정' : '저장'));
  majorCategoryList = computed(() => this.majorCategoryService.list.value() ?? []);
  minorCategoryList = computed(() => this.minorCategoryService.list.value() ?? []);
  scriptureList = computed(() => this.scriptureService.list.value() ?? []);
  filteredScriptureList = computed(() => {
    const query = this.searchScripture().toLowerCase().trim();
    const list = this.scriptureList();
    if (!query) return list;
    return list.filter((x) => x.searchKey?.includes(query));
  });
  readonly filteredMinorList = computed(() => {
    const majorCode = this.selectedMajorCategory();
    if (!majorCode) return this.minorCategoryList();
    return this.minorCategoryList().filter((x) => x.code.startsWith(majorCode));
  });
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
          scriptureName: data.scriptureName,
          title: data.title,
          chineseTitle: data.chineseTitle,
          originalTitle: data.originalTitle,
          author: data.author,
          translator: data.translator,
          coverImageUrl: data.coverImageUrl,
          manifestation: data.manifestation,
          hierarchyInfo: data.hierarchyInfo,
          location: data.location,
          details: data.details,
          pinOrder: data.pinOrder,
        });
      }
    });

    effect(() => {
      this.selectedMajorCategory();
      this.createForm.setValue('minorCagegoryCode', null);
    });
  }

  ngOnInit(): void {
    this.createForm.initialize(CANON_FORM_CONFIG, this.service);
  }

  ngAfterViewInit() {
    this.createForm.enableField('pinOrder', this.isAdmin());
  }

  // 이벤트 핸들러 - major 선택 시 Code 추출
  onMajorCategorySelectionChange(event: MatSelectChange): void {
    const major = this.majorCategoryList().find((x) => x.id === event.value);
    this.selectedMajorCategory.set(major?.code ?? null);
  }

  clearSearch() {
    this.searchText.set('');
  }

  // #region 카테고리

  clearScriptureSearch() {
    this.searchScripture.set('');
  }

  onSearchScriptureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchScripture.set(input.value);
  }

  volumes = signal<string | null>('');
  chapters = signal<string | null>('');
  sections = signal<string | null>('');
  verses = signal<string | null>('');

  /**
   * 경전 선택 이벤트
   * @param event
   */
  onScriptureSelectionChange(event: MatSelectChange) {
    const filtered = this.scriptureList().findLast((x) => x.id === event.value);

    this.volumes.set(`${filtered?.totalVolumes ?? ''} ${filtered?.volumeUnit ?? ''}`);
    this.chapters.set(`${filtered?.totalChapters ?? ''} ${filtered?.chapterUnit ?? ''}`);
    this.sections.set(`${filtered?.totalSections ?? ''} ${filtered?.sectionUnit ?? ''}`);
    this.verses.set(`${filtered?.totalVerses ?? ''} ${filtered?.verseUnit ?? ''}`);

    this.createForm.form.patchValue({
      abbreviation: filtered?.abbr,
      chineseTitle: filtered?.nameCn,
      originalTitle: filtered?.originName,
    });
  }

  // #endregion

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

  async onDelete(id: number): Promise<void> {
    const result = await this.excutor.excute(() => this.service.delete(id), {
      success: '삭제 완료',
    });

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
      () => (id ? this.service.createOrUpdate(payload, id) : this.service.createOrUpdate(payload)),
      {
        success: id ? '수정 완료' : '저장 완료',
      },
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
}

/*
export const DHARMA_CATEGORY = {
  MAJOR: '법륜 (Dharmacakra)', // Major Category
  MINOR: '법문 (Dharmamukha)',  // Minor Category
  CONTENT: '진언 (Mantra)'      // 실제 내용/데이터
};
*/

/*
--- 직접 조함 ---
filteredScriptureList = computed(() => {
  const query = this.searchScripture().toLowerCase().trim();
  const list = this.scriptureList();
  if (!query) return list;

  return list.filter(x => {
    const searchKey = [
      x.abbr,
      x.nameKr,
      x.nameCn ?? '',
      x.nameEn ?? '',
      x.originName ?? '',
    ].join(' ').toLowerCase();

    return searchKey.includes(query);
  });
});

*/
