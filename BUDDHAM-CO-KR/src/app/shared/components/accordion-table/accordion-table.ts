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

  detailUrl = input<string>();
  pageSize = input<number>(10);
  cols = input<IColumnDef[]>([]);
  data = input<T[]>([]);
  currentData = output<T>();

  // ViewChild
  page = viewChild<MatPaginator>(MatPaginator)
  sortor = viewChild<MatSort>(MatSort)

  @ViewChild('formTop') formTop!: ElementRef<HTMLElement>;

  router = inject(Router);
  injector = inject(Injector);

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
        value: (element as any)[col.key]
      }));

    this.tabPropertiesCache.set(cacheKey, properties);
    return properties;
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

  // openRow(rowEl: EventTarget | null) {
  //   if (!rowEl) return;
  //   const el = rowEl as HTMLElement;
  //   el.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start'
  //   });
  // }

  goTo(id: any) {
    console.log(this.router.url);

    this.router.navigate([this.detailUrl(), id], {
      queryParams: { returnUrl: this.router.url }
    });
  }
}
