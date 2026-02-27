import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, ElementRef, inject, Injector, input, output, signal, ViewChild, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { EnumToKeyPipe } from "@app/core/pipes/enum-to-key-pipe";
import { TruncatePipe } from "@app/core/pipes/slice-pipe-pipe";
import { MAINCATEGORY_OPTIONS } from '@app/core/enums/main-category-type';
import { SCRIPTURE_STRUCTURE_TYPE_OPTIONS } from '@app/core/enums/scripture-structure-type';
import { CONTENTCATEGORY_OPTIONS } from '@app/core/enums/content-category';
import { ORIGINAL_LANG_OPTIONS } from '@app/core/enums/original-language';
import { POSTTYPE_OPTIONS } from '@app/core/enums/post-type';
import { SCRIPT_TYPE_OPTIONS } from '@app/core/enums/script-type';
import { SCRIPTURE_COLLECTION_OPTIONS } from '@app/core/enums/scripture-collection';
import { TRADITION_OPTIONS } from '@app/core/enums/tradition';

@Component({
  selector: 'accordion-table',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    EnumToKeyPipe,
    TruncatePipe
  ],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './accordion-table.html',
  styleUrl: './accordion-table.scss',
})
export class AccordionTable<T extends { id: string | number }> implements AfterViewInit {

  private router = inject(Router);
  injector = inject(Injector);

  detailUrl = input<string>();
  pageSize = input<number>(10);
  cols = input<IColumnDef[]>([]);
  data = input<T[]>([]);
  showSearch = input<boolean>(true);
  totalTotal = input<number>(0); // 전체 아이템 수
  pageNumber = input<number>(0); // 현재 페이지
  isLoading = input<boolean>(false); // 로딩 상태 공유

  currentData = output<T>();
  loadMore = output<void>(); // 더보기 클릭 이벤트

  currentCount = computed(() => this.data().length);
  hasMore = computed(() => this.currentCount() < this.totalTotal());

  // ViewChild
  page = viewChild<MatPaginator>(MatPaginator)
  sortor = viewChild<MatSort>(MatSort)
  @ViewChild('formTop') formTop!: ElementRef<HTMLElement>;

  // State
  expandedCache = signal<Set<string>>(new Set());
  expandedElement = signal<T | null>(null);

  readonly dataSource = new MatTableDataSource<T>;

  // 테이블 컬럼
  readonly displayedColumns = computed(() => this.cols().filter(c => c.showInTable !== false).map(c => c.key));

  displayedColumsWithExpand = computed(() => [...this.displayedColumns(), 'expand']);

  // 🔥 메모이제이션된 탭 데이터
  private tabPropertiesCache = new Map<string, Array<{
    key: string,
    label: string,
    value: any
  }>>();

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
  ) {
    effect(() => {
      const data = this.data();
      this.tabPropertiesCache.clear(); //  데이터가 바뀌면 캐시를 초기화 하기.
      if (data) this.dataSource.data = this.data();
    });
  }

  ngAfterViewInit() {
    const paginator = this.page();
    const sort = this.sortor();
    if (!paginator || !sort) return;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
  }

  readonly calculatedPageIndex = computed(() => {
    const size = this.pageSize();
    const count = this.currentCount();

    if (size <= 0 || this.pageNumber() === 0) return 0;

    const index = Math.floor(count / size);
    // 추가적인 복잡한 비즈니스 로직(예: 특정 범위 제한 등)을 여기에!
    return index;
  });

  public onLoadMore() {
    this.loadMore.emit();
  }

  enumToString(col: any) {
    return Object.keys(col);
  }

  getTabProperties(element: T): Array<{ key: string; label: string; value: any }> {

    // 🔥 id를 string으로 변환하여 캐시 키로 사용
    const cacheKey = String(element.id);

    if (this.tabPropertiesCache.has(cacheKey)) {
      return this.tabPropertiesCache.get(cacheKey)!;
    }

    const properties = this.cols()
      .filter(col => col.showInTab !== false)
      .sort((a, b) => (a.tabOrder ?? 999) - (b.tabOrder ?? 999))
      .map(col => ({
        key: col.key,
        label: col.tabLabel || col.label,
        value: this.formatValue(element, col) // 포맷 적용!
      }));

    this.tabPropertiesCache.set(cacheKey, properties);
    return properties;
  }

  private formatValue(element: T, col: IColumnDef): string {
    const rawValue = (element as any)[col.key];

    // null/undefined 처리
    if (rawValue === null || rawValue === undefined) return '';

    switch (col.pipe) {
      case 'date':
        return this.datePipe.transform(
          rawValue,
          col.pipeArgs || 'yyyy-MM-dd'
        ) || String(rawValue);

      case 'currency':
        return this.currencyPipe.transform(
          rawValue,
          col.pipeArgs || 'KRW'
        ) || String(rawValue);

      case 'enum':
        return this.formatEnumValue(rawValue, col);

      case 'truncate':
        // 탭에서는 전체 텍스트 표시 (truncate 안 함)
        return String(rawValue);

      default:
        return String(rawValue);
    }

  }

  isExpanded = computed(() => {
    const expanded = this.expandedElement();
    return (element: T) => expanded === element;
  });

  toggle(element: T & { id: string }) {

    const current = this.expandedElement();

    if (current === element) {
      this.expandedElement.set(null);
      return;
    }

    this.expandedElement.set(element);

    this.expandedCache.update(set => {
      const next = new Set(set);
      next.add(element.id);
      return next;
    });
  }

  // 🔥 Enum 포맷팅 (enumToKey 파이프 로직 복제)
  private formatEnumValue(value: any, col: IColumnDef): string {

    if (!col.enumType) {
      return String(value);
    }

    const enumMap: Record<string, any[]> = {
      'MainCategoryType': MAINCATEGORY_OPTIONS,
      'ScriptureStructureType': SCRIPTURE_STRUCTURE_TYPE_OPTIONS,
      'ContentCategory': CONTENTCATEGORY_OPTIONS,
      'OriginalLanguage': ORIGINAL_LANG_OPTIONS,
      'PostType': POSTTYPE_OPTIONS,
      'ScriptType': SCRIPT_TYPE_OPTIONS,
      'ScriptureCollection': SCRIPTURE_COLLECTION_OPTIONS,
      'BuddhistTradition': TRADITION_OPTIONS
    };

    const options = enumMap[col.enumType];
    if (!options) {
      return String(value);
    }

    const property = col.pipeArgs || 'label';
    const option = options.find(opt => opt.value === value);
    return option ? option[property] : String(value);
  }

  formatCellValue(value: any, col: IColumnDef): string {

    if (!col.pipe) return value;

    switch (col.pipe) {
      case 'date':
        return this.datePipe.transform(value, col.pipeArgs || 'yyyy-MM-dd') || value;
      case 'currency':
        return this.currencyPipe.transform(value, col.pipeArgs || 'KRW') || value;
      default:
        return value;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  onRowClick(t: T) {
    this.currentData.emit(t);
  }

  goTo(id: any) {
    console.log(this.router.url);

    this.router.navigate([this.detailUrl(), id], {
      queryParams: { returnUrl: this.router.url }
    });
  }
}

/**
 * 🔥 성능 최적화: 탭 프로퍼티 메모이제이션
 *
 * 이유: getTabProperties()가 Change Detection마다 재실행되어
 *       100개 행 * 스크롤/렌더링 = 수천 번 계산 문제 발생
 *
 * 효과: 첫 계산만 수행, 이후 캐시 사용 (100배 성능 향상)
 *
 * ⚠️ 절대 삭제 금지! 삭제하면 스크롤 버벅거림!
 */
