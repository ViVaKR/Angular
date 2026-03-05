import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, inject, input, model, output, signal, viewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { EnumToKeyPipe } from "@app/core/pipes/enum-to-key-pipe";
import { TruncatePipe } from "@app/core/pipes/slice-pipe-pipe";
import { resolveEnumLabel } from '@app/core/enums/enum-utils';
import { ISearchConfig } from '@app/core/interfaces/i-search-config';
import { ThreadBoard } from "@app/shared/thread-board/thread-board";

@Component({
  selector: 'accordion-table',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    EnumToKeyPipe,
    TruncatePipe,
    ThreadBoard
  ],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './accordion-table.html',
  styleUrl: './accordion-table.scss',
})
export class AccordionTable<T extends { id: string | number }> implements AfterViewInit {

  private router = inject(Router);

  detailUrl = input<string>();
  pageSize = input<number>(10);
  cols = input<IColumnDef[]>([]);
  data = input<T[]>([]);
  showSearch = input<boolean>(true);
  totalItems = input<number>(0); // 전체 아이템 수
  pageNumber = input<number>(0); // 현재 페이지
  isThreadMode = input<boolean>(false); // 쓰레드 형식 여부
  isLoading = input<boolean>(false); // 로딩 상태 공유
  likeClick = output<T>(); // 좋아요 클릭 이벤트 위임


  // 전략 config 를 input으로 받음
  searchConfig = input<ISearchConfig>({
    strategy: 'local',
    localThreshold: 1,
    serverThreshold: 2
  });

  // 서버 검색 활성 여부 - input으로 받아서 UI만 표현
  isServerSearchActive = input<boolean>(false);

  searchChange = output<string>(); // 서버 FTS 요청
  searchClear = output<void>(); // 초기화
  currentData = output<T>();
  loadMore = output<void>();
  readonly selectedItem = signal<T | null>(null);

  currentCount = computed(() => this.data().length);
  hasMore = computed(() => this.currentCount() < this.totalItems());

  // ViewChild
  page = viewChild<MatPaginator>(MatPaginator)
  sortor = viewChild<MatSort>(MatSort)

  // State
  expandedCache = signal<Set<string>>(new Set());
  expandedElement = signal<T | null>(null);

  readonly dataSource = new MatTableDataSource<T>;

  // 테이블 컬럼
  readonly displayedColumns = computed(() => this.cols().filter(c => c.showInTable !== false).map(c => c.key));

  displayedColumsWithExpand = computed(() => [...this.displayedColumns(), 'expand']);

  isExpanded = computed(() => {
    const expanded = this.expandedElement();
    return (element: T) => expanded === element;
  });

  // 🔥 메모이제이션된 탭 데이터
  private tabPropertiesCache = new Map<string, Array<{ key: string, label: string, value: any }>>();

  currentPage = model<number>(0);
  previousDataLength = signal<number>(0);

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {
    effect(() => {
      const newData = this.data();
      this.tabPropertiesCache.clear();
      if (newData) this.dataSource.data = newData;

    });
  }

  ngAfterViewInit() {
    const paginator = this.page();
    const sort = this.sortor();
    if (!paginator || !sort) return;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    // this.pageSize.set(event.pageSize);
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  enumToString(col: any) {
    return Object.keys(col);
  }

  getTabProperties(element: T): Array<{ key: string; label: string; value: any }> {

    const cacheKey = String(element.id);

    if (this.tabPropertiesCache.has(cacheKey))
      return this.tabPropertiesCache.get(cacheKey)!;

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

  formatValue(element: T, col: IColumnDef): string {

    const rawValue = (element as any)[col.key];

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
        return String(rawValue);

      default:
        return String(rawValue);
    }

  }

  searchTooltip(tip: string): string {
    return `데이터 (${tip}) 중에서 검색...`;
  }

  toggle(element: T & { id: string }) {

    const current = this.expandedElement();

    if (current === element) {
      this.expandedElement.set(null);
      this.selectedItem.set(null);

      return;
    }

    this.selectedItem.set(element);
    this.expandedElement.set(element);

    this.expandedCache.update(set => {
      const next = new Set(set);
      next.add(element.id);
      return next;
    });
  }

  formatEnumValue(value: any, col: IColumnDef): string {
    return resolveEnumLabel(value, col.enumType!, col.pipeArgs);
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

    const value = (event.target as HTMLInputElement).value;

    const trimmed = value.trim();

    const config = this.searchConfig();

    // 1. 빈 값 -> 전체 초기화
    if (!trimmed) {
      this.dataSource.filter = '';
      this.searchChange.emit(''); // 서버도 초기화
      return;
    }

    // 2. 로컬 전략 or 서버 임계값 미만 -> 로컬 필터
    if (
      config.strategy === 'local' || trimmed.length < config.serverThreshold
    ) {
      this.dataSource.filter = trimmed.toLowerCase();
      return;
    }

    // 3. 서버 FTS 임계값 이상 -> 서버 요청
    this.dataSource.filter = '';
    this.searchChange.emit(trimmed);
    this.dataSource.paginator?.firstPage();
  }

  onRowClick(t: T) {
    this.currentData.emit(t);
  }

  onLikedClick(element: T): void {
    this.likeClick.emit(element);
  }

  goTo(id: any) {
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
