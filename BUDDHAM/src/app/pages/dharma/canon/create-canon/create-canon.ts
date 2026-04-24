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
import { FormArray, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { getEnumOptions } from '@app/core/enums/enum-utils';
import { PinOrder, pinOrderLabel } from '@app/core/enums/pin-order';
import { ICanonEntry, ICanonView } from '@app/core/interfaces/dharma/i-canon-schema';
import { AlertService } from '@app/core/services/alert-service';
import { CanonService } from '@app/core/services/dharma/canon-service';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { LocationService } from '@app/core/services/location-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { CANON_FORM_CONFIG } from '@app/forms/form-configs';
import { BodyTitle } from '@app/shared/body-title/body-title';
import { ErrorState } from '@app/shared/error-state/error-state';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { LoadingState } from '@app/shared/loading-state/loading-state';
import { DharmaScriptureService } from '../../dharma-scripture/services/dharma-scripture';
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
  data = model<ICanonView | null>(null);


  /* inject */
  readonly service = inject(CanonService);
  readonly scriptureService = inject(DharmaScriptureService);

  readonly excutor = inject(FormCommandExcutorService);
  readonly createForm = inject(GenericFormService<ICanonEntry>);

  readonly alert = inject(AlertService);
  readonly anchorId = input<string>('anchorId');
  readonly userStore = inject(UserStore);
  readonly locationService = inject(LocationService);

  searchText = signal<string>('');
  searchScripture = signal<string>('');
  readonly currentFont = signal('font-ibm');
  readonly currentFontSize = signal('16px');
  readonly rows = signal<number>(10);

  /* computed */
  btnLabel = computed(() => (this.data() ? '수정' : '저장'));
  scriptureList = computed(() => this.scriptureService.listAll.value() ?? []);

  filteredScriptureList = computed(() => {
    const query = this.searchScripture().toLowerCase().trim();

    const list = this.scriptureList();
    if (!query) return list;
    return list.filter((x) => x.searchKey?.includes(query));
  });

  readonly isAdmin = computed(() => {
    return this.userStore.userRoles().includes('Admin');
  });

  readonly fb: FormBuilder = inject(FormBuilder);

  constructor() {
    effect(() => {

      const data = this.data();
      if (data) {

        // 일반 필드 패치
        this.createForm.form.patchValue(data);

        // 리스트 데이터 (Maninfestation) 는 FormArray 에 수동 안착
        const array = this.createForm.form.get('manifestation') as FormArray;
        array.clear();
        data.manifestation?.forEach(item => {

          // 각 아이템을 새로운 FromGroup으로 만들어 배열에 추가
          const itemGroup = this.fb.group({
            kind: [item.kind, Validators.required],
            sang: [item.sang, Validators.required],
            url: [item.url, Validators.required],
            image: [item.image],
            label: [item.label],
            attributes: [item.attributes]
          });
          array.push(itemGroup);
        });
      }
    });
  }

  ngOnInit(): void {
    // 1. 기본 캐논 폼 설정으로 초기화
    this.createForm.initialize(CANON_FORM_CONFIG, this.service);

    // 2. manifestation 필드를 FormArray 로 교체 (이이 존재한다면 skip 하거나 덮어씀)
    // 제너릭 서비스 내부에서 FormControl 로 생성했다면, 이를 FormArray 로 바꿔치기 함
    if (!(this.createForm.form.get("manifestation") instanceof FormArray)) {
      this.createForm.form.setControl('manifestation', new FormArray([]));
    }
  }

  get manifestationFormArray(): FormArray {
    return this.createForm.form.get('manifestation') as FormArray;
  }

  async ngAfterViewInit() {
    this.createForm.enableField('pinOrder', this.isAdmin());
    if (!this.data()) { await this.makeLocation(); }
  }

  async makeLocation() {

    let latitude: number | undefined;
    let longitude: number | undefined;

    try {
      const pos = await this.locationService.getCurrentLocation();
      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;
      this.createForm.setValue('latitude', latitude);
      this.createForm.setValue('longitude', longitude);
      console.log(`[함대 현재 좌표] 위도(Lat): ${latitude}, 경도(Lon): ${longitude}`);
    } catch (error) {
      console.error('위치 정보를 가져오지 못했습니다. 위치 없이 저장 합니다.');
    }
  }
  // 나툼 추가/삭제 메서드
  addManifestation() {
    const manifestationArray = this.createForm.form.get('manifestation') as FormArray;
    manifestationArray.push(this.fb.group({
      kind: ['youtube'],
      sang: ['video'],
      url: [''],
      label: ['새로운 나툼']
    }));
  }

  removeManifestation(index: number) {
    (this.createForm.form.get('manifestation') as FormArray).removeAt(index);
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

    const formValue = this.createForm.submitValue();
    if (!formValue) return;

    const currentId = this.data()?.id;
    // 2. payload에 id를 합칩니다. (서비스의 createOrUpdate가 알아서 판단함)
    const payload = { ...formValue, id: currentId };

    // 3. 단 한 줄로 실행!
    // 이제 id를 인자로 보낼지 말지 삼항 연산자를 쓸 필요가 없습니다.
    const result = await this.excutor.excute(
      () => this.service.createOrUpdate(payload),
      {
        success: currentId ? '함대의 기록을 수정했습니다' : '새로운 진리를 안착시켰습니다',
      }
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

// this.createForm.form.patchValue({
//   subject: data.subject,
//   scriptureId: data.scriptureId,
//   code: data.code,
//   author: data.author,
//   translator: data.translator,
//   pinOrder: data.pinOrder,
//   manifestation: data.manifestation, // TODO : jsonb 처리 할 로직..
//   latitude: data.latitude,
//   longitude: data.longitude,
//   details: data.details
// });

