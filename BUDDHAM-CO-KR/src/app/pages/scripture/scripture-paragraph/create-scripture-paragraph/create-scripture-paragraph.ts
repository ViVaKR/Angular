import {
  afterNextRender, AfterViewInit, Component, computed,
  effect, inject, Injector, input, model, output, signal, viewChild,
  viewChildren
} from '@angular/core';
import { SCRIPTURE_PARAGRAPH } from '@app/forms/form-configs';
import { DEFAULT_STRUCTURE_LABEL, IScriptureParagraph, IScriptureStructureLabel } from '@app/core/interfaces/i-scripture-paragraph';
import { FormGroupDirective } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { ScriptureService } from '@app/core/services/scripture-service';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { FontSelector } from '@app/shared/font-selector/font-selector';
import { FontSizeSelector } from '@app/shared/font-size-selector/font-size-selector';
import { MatSelectChange } from '@angular/material/select';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { ORIGINAL_LANG_OPTIONS } from '@app/core/enums/original-language';
import { ScriptureStructureType } from '@app/core/enums/scripture-structure-type';
import { IScriptureMaster } from '@app/core/interfaces/i-scripture-master';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { IScriptureParagraphListDTO } from '@app/core/interfaces/i-scripture-paragraph-list-dto';

@Component({
  selector: 'app-create-scripture-paragraph',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FontSelector,
    FontSizeSelector,
    BodyTitle
  ],
  templateUrl: './create-scripture-paragraph.html',
  styleUrl: './create-scripture-paragraph.scss',
})
export class CreateScriptureParagraph implements AfterViewInit {

  title = '데이터 관리';
  btnLabel = computed(() => this.data() ? '수정' : '저장');

  data = model<IScriptureParagraphListDTO | null>(null);

  anchorId = input<string>('anchorId');

  icon = 'post_add';
  private scriptureService = inject(ScriptureService);
  private excutor = inject(FormCommandExcutorService);
  private injector = inject(Injector);

  public createForm = inject(GenericFormService<IScriptureParagraph>);
  resetRequested = output<void>();

  private readonly selectedMasterId = signal<number | null>(null);


  currentFont = signal('font-ibm');
  currentFontSize = signal<string>('20px');
  rows = signal<number>(10);

  // 자동/수동 토글
  formValueSignal = signal<any>(null);
  autoSortOrder = signal(true);
  autoRefCode = signal(true);

  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i => i + min));

  formDirective = viewChild<FormGroupDirective>('formDirective');

  autosize = viewChildren<CdkTextareaAutosize>('autosize');

  readonly lineSpace = 1.8;

  readonly masterList = computed(() => this.scriptureService.masterList.value() ?? []);


  originalLanguage = ORIGINAL_LANG_OPTIONS;

  readonly lang = computed(() => {
    const masterId = this.selectedMasterId();
    if (!masterId) return '-';

    const master = this.masterList().find(x => x.id === masterId);
    if (!master) return '-';

    return this.originalLanguage.find(x => x.value === master.originalLanguage)
      ?.label ?? '-';
  });

  // ✅ structureLabel computed 완전 완성
  readonly structureLabel = computed((): IScriptureStructureLabel => {

    const masterId = this.selectedMasterId()
      ?? this.data()?.scriptureMasterId
      ?? null;

    // ── 기본값 (masterId 없을 때) ──────────────────
    if (!masterId) return DEFAULT_STRUCTURE_LABEL;

    // ── 1순위: 서버 저장 레이블 ────────────────────
    // structureLabelMap.value()가 httpResource의 실제 데이터
    const labelMap = this.scriptureService.structureLabelMap.value();
    const saved = labelMap?.[masterId];
    if (saved) return saved;

    // ── 2순위: StructureType 기반 자동 결정 ────────
    // 서버에 저장된 레이블이 없을 때 fallback
    const master = this.scriptureService.masterList.value()
      ?.find(x => x.id === masterId);

    return resolveStructureLabel(master?.structureType);
  });

  constructor() {
    effect(() => {
      const data = this.data();
      if (!data) return;

      if (data) {
        this.createForm.form.patchValue({
          title: data.title,
          scriptureMasterId: data.scriptureMasterId,
          volume: data.volume,
          volumeTitle: data.volumeTitle,
          chapter: data.chapter,
          chapterTitle: data.chapterTitle,
          section: data.section,
          sectionTitle: data.sectionTitle,
          verse: data.verse,
          verseTitle: data.verseTitle,
          sortOrder: data.sortOrder,
          refCode: data.refCode,
          content: data.content,
          chineseContent: data.chineseContent,
          originalContent: data.originalContent,
          commentary: data.commentary,
          keywords: data.keywords

        });
        // scriptureMasterId 변경을 signal로 동기화
        this.selectedMasterId.set(data.scriptureMasterId ?? null);
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

    // effect sortOrder 로 자동 계산값 폼에 반영
    effect(() => {
      if (this.autoSortOrder()) {
        this.createForm.form.patchValue({
          sortOrder: this.calculatedSortOrder()
        }, { emitEvent: false }); // <- 무한루프 방지
      }
    });

    // effect refCode 자동 반영
    effect(() => {
      if (this.autoRefCode()) {
        this.createForm.form.patchValue({
          refCode: this.calculatedRefCode()
        }, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.createForm.initialize(SCRIPTURE_PARAGRAPH, this.scriptureService);


    // 폼 값 변경시 signal 업데이트
    this.createForm.form.valueChanges.subscribe(val => { this.formValueSignal.set(val) });

    // ✅ form 초기화 이후에 valueChanges 구독
    this.createForm.form.get('scriptureMasterId')?.valueChanges
      .subscribe(id => this.selectedMasterId.set(id));
  }

  ngAfterViewInit(): void {
    this.triggerResize();
  }

  // 자동 계산
  readonly calculatedSortOrder = computed(() => {

    const val = this.formValueSignal();
    if (!val) return 0;
    const v = val.volume ?? 0;
    const c = val.chapter ?? 0;
    const s = val.section ?? 0;
    const ve = val.verse ?? 0;
    console.log(v, c, s, ve);

    // 공식: volume*1000000 + chapter*10000 + section*100 + verse
    return (v * 1_000_000) + (c * 10_000) + (s * 100) + ve;
    // 예시:
    // 반야심경 §1-v01  → 0 + 0 + 100 + 1    = 101
    // 반야심경 §1-v15  → 0 + 0 + 100 + 15   = 115
    // 반야심경 §5-v01  → 0 + 0 + 500 + 1    = 501
    // 법화경 1권2품3절 → 1000000 + 20000 + 0 + 3 = 1020003
    // 화엄경 80권39품  → 80000000 + 390000 + ... = 80390000
  });

  readonly calculatedRefCode = computed(() => {
    const masterId = this.selectedMasterId();
    if (!masterId) return '';

    const master = this.masterList().find(x => x.id === masterId);
    if (!master) return '';

    const abbr = this.getAbbreviation(master);
    const form = this.createForm.form;

    const parts: string[] = [abbr];
    const v = form.get('volume')?.value;
    const c = form.get('chapter')?.value;
    const s = form.get('section')?.value;
    const ve = form.get('verse')?.value;

    if (v) parts.push(`${v}`);
    if (c) parts.push(`${c}`);
    if (s) parts.push(`${s}`);
    if (ve) parts.push(`${ve}`.padStart(3, '0'));

    return parts.join('-');
  });

  triggerResize() {
    afterNextRender(() => {
      this.autosize().forEach(el => { el.resizeToFitContent(true); });
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

  private getAbbreviation(master: IScriptureMaster): string {
    // ScriptureMaster에 abbreviation 필드 추가 권장
    // 없으면 자동 생성
    return this.data()?.masterAbbreviation || this.generateAbbr(master.title);
  }

  private generateAbbr(title: string): string {
    const standardAbbr: Record<string, string> = {
      '반야심경': 'HJS',
      '금강경': 'Vajra',
      '법구경': 'Dhp',
      '법화경': 'Lotus',
      '화엄경': 'Avatar',
      // 더 추가...
    };
    return standardAbbr[title] ?? title.slice(0, title.length).toUpperCase();
  }

  // 게송 번호 패딩 (3자리)
  private padVerse(num: number): string {
    return num.toString().padStart(3, '0');
  }

  /**
   * 폼 제출
   */
  async onSubmit(event: MouseEvent) {

    event.preventDefault();

    const payload = this.createForm.submitValue();
    if (!payload) return;

    const data = this.data();
    const id = data?.id;

    const result = await this.excutor.excute(
      () => id
        ? this.scriptureService.paragraphCreateOrUpdate(payload, id)
        : this.scriptureService.paragraphCreateOrUpdate(payload),
      {
        success: id ? '수정 완료' : '저장 완료'
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
      () => this.scriptureService.paragraphDelete(id),
      {
        success: '삭제 완료'
      }
    );
    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
}

// ── 헬퍼 함수들 (컴포넌트 외부) ──────────────────────────

// structureType → 기본 레이블 자동 결정
function resolveStructureLabel(
  structureType?: ScriptureStructureType
): IScriptureStructureLabel {

  switch (structureType) {

    case ScriptureStructureType.SectionVerse:
      // 반야심경 같은 단문 경전
      return {
        scriptureMasterId: 0,
        volumeLabel: undefined, useVolume: false,
        chapterLabel: undefined, useChapter: false,
        sectionLabel: '단락 (段)', useSection: true,
        verseLabel: '절 (節)', useVerse: true,
      };

    case ScriptureStructureType.NikayaSuttaVerse:
      // 팔리 니까야
      return {
        scriptureMasterId: 0,
        volumeLabel: undefined, useVolume: false,
        chapterLabel: '품 (Vagga)', useChapter: true,
        sectionLabel: '경 (Sutta)', useSection: true,
        verseLabel: '게송 (Gāthā)', useVerse: true,
      };

    case ScriptureStructureType.VolumeChapterVerse:
      // 법화경, 화엄경 등 대부분의 대승경전
      return {
        scriptureMasterId: 0,
        volumeLabel: '권 (卷)', useVolume: true,
        chapterLabel: '품 (品)', useChapter: true,
        sectionLabel: undefined, useSection: false,
        verseLabel: '절 (節)', useVerse: true,
      };

    default:
      return DEFAULT_STRUCTURE_LABEL;
  }
}
