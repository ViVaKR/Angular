import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, inject, input, model, output, signal, viewChild } from '@angular/core';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { Router } from '@angular/router';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAINCATEGORY_OPTIONS } from '@app/core/enums/main-category-type';
import { SCRIPTURE_STRUCTURE_TYPE_OPTIONS } from '@app/core/enums/scripture-structure-type';
import { CONTENTCATEGORY_OPTIONS } from '@app/core/enums/content-category';
import { ORIGINAL_LANG_OPTIONS } from '@app/core/enums/original-language';
import { POSTTYPE_OPTIONS } from '@app/core/enums/post-type';
import { SCRIPT_TYPE_OPTIONS } from '@app/core/enums/script-type';
import { SCRIPTURE_COLLECTION_OPTIONS } from '@app/core/enums/scripture-collection';
import { TRADITION_OPTIONS } from '@app/core/enums/tradition';
import { TruncatePipe } from "@app/core/pipes/slice-pipe-pipe";
import { EnumToKeyPipe } from "@app/core/pipes/enum-to-key-pipe";

@Component({
  selector: 'data-table',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    TruncatePipe,
    EnumToKeyPipe
  ],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable<T extends { id: string | number }> implements AfterViewInit {

  // DI
  private readonly router = inject(Router);
  private readonly datePipe = inject(DatePipe);
  private readonly currencyPipe = inject(CurrencyPipe);

  // Input
  detailUrl = input<string>();
  pageSize = model<number>(10);
  cols = input<IColumnDef[]>([]);
  data = input<T[]>([]);
  totalItems = input<number>(0); // 전체 아이템 수
  pageNumber = input<number>(0);  // 현재 페이지 번호
  currentPage = model<number>(0);
  isPaginated = input<boolean>(false); // false = 소용량 모드, true = 대용량 모드
  isLoading = input<boolean>(false); // 로딩 상태 공유

  // Output
  currentData = output<T>();
  loadMore = output<void>(); // 더보기 클릭 이벤트

  // Computed
  readonly displayedColumns = computed(() => this.cols().filter(c => c.showInTab !== false).map(c => c.key));

  displayedColumsWithExpand = computed(() => [...this.displayedColumns(), 'expand']);

  currentDataCount = computed(() => this.data().length);
  hasMore = computed(() => this.currentDataCount() < this.totalItems());

  isExpanded = computed(() => {
    const expanded = this.expandedElement();
    return (element: T) => expanded === element;
  });

  calculatedPageIndex = computed(() => {
    const size = this.pageSize();
    if (size <= 0 || this.pageNumber() === 0) return 0;
    // const index = Math.floor(count / size);
    return this.currentPage;
  });

  // ViewChild
  page = viewChild<MatPaginator>(MatPaginator);
  sortor = viewChild<MatSort>(MatSort);

  // Signal State
  expandedCache = signal<Set<string>>(new Set());
  expandedElement = signal<T | null>(null);

  // DataSource
  readonly dataSource = new MatTableDataSource<T>;

  // 메모이제이션 탭 데이터
  private tabPropertiesCache = new Map<string, Array<{
    key: string, label: string, value: any
  }>>();

  // currentPage 시그널을 추가해서 현재 위치를 기억하게나 (이미 있다면 사용!)
  previousDataLength = 0;
  constructor() {
    effect(() => {
      const newData = this.data();
      this.tabPropertiesCache.clear();
      if (newData) this.dataSource.data = newData;
    });
  }

  ngAfterViewInit(): void {
    const paginator = this.page();
    const sort = this.sortor();
    if (!paginator || !sort) return;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  enumToString = (col: any) => Object.keys(col);

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

  resetPaging() {
    this.previousDataLength = 0;
    this.dataSource.paginator?.firstPage();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

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

  onRowClick(t: T) {
    this.currentData.emit(t);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.currentPage.set(event.pageIndex);
  }

  goTo(id: any) {
    this.router.navigate([this.detailUrl(), id], {
      queryParams: { returnUrl: this.router.url }
    });
  }
}


/*

Angular의 effect()는 기본적으로 Injection Context 안에서만 실행 가능함.
C#으로 비유하면 DI 컨테이너 스코프 안에서만 resolve 가능한 것과 비슷한 개념이야.
그래서 constructor 또는 inject() 호출 시점이 아닌 다른 라이프사이클에서 effect를 쓰고 싶을 때
injector를 명시적으로 넘겨서 컨텍스트를 유지시키는 거야.

*/



// 페이징 여부에 따른 전략 패턴 (Strategy)
// const strategy = this.isPaginated()
//   ? () => this.handlePaginatedData(newData.length)
//   : () => this.resetPaging();

// strategy();

// const isFirstLoad = data.length > 0
//   && this.previousDataLength === 0;

// if (this.isPaginated()) {
//   if (isFirstLoad) {
//     this.dataSource.paginator?.firstPage();
//   }
//   this.previousDataLength = data.length; // 길이 동기화
// } else {
//   // 페이징 미사용 시 초기화 (패터의 일관성)
//   this.dataSource.paginator?.firstPage();
//   this.previousDataLength = 0;
// }

// if (this.isPaginated() && data.length > 0) {
//   if (this.previousDataLength === 0) {
//     this.dataSource.paginator?.firstPage();
//   }
//   this.previousDataLength = data.length;
// }

// // isPaginated 아닐때는 항상 첫 페이지
// if (!this.isPaginated()) {
//   this.previousDataLength = 0;
// }

// private handlePaginatedData(length: number) {
//   // 데이터가 없다가 처음 생겼을 때만 firstPage()
//   if (this.previousDataLength === 0 && length > 0) {
//     this.dataSource.paginator?.firstPage();
//   }
//   this.previousDataLength = length;
// }
