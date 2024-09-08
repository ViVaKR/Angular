import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { formatNumber, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { IBible } from '@app/interfaces/i-bible';
import { ICategory } from '@app/interfaces/i-category';
import { BibleService } from '@app/services/bible.service';
import { CategoryService } from '@app/services/category.service';
import { Subscription } from 'rxjs';
import { CustomSlicePipe } from "../../pipes/custom-slice.pipe";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighlightAuto, Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { MatListModule } from '@angular/material/list';
import { bibleChapters } from '../bible-category/bibleChapters';
import { ICategoryVerse } from '@app/interfaces/i-category-verse';
import { ScrollArrowComponent } from '@app/scroll-arrow/scroll-arrow.component';
import { BibleReadComponent } from '@app/bible/bible-read/bible-read.component';
@Component({
  selector: 'app-bible-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    JsonPipe,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSort,
    MatSortModule,
    MatPaginatorModule,
    MatTooltip,
    ClipboardModule,
    CustomSlicePipe,
    MatProgressSpinnerModule,
    Highlight,
    HighlightAuto,
    HighlightLineNumbers,
    MatListModule,
    ScrollArrowComponent,
    BibleReadComponent
  ],
  templateUrl: './bible-list.component.html',
  styleUrl: './bible-list.component.scss',
  providers: [HighlightAuto, HighlightLineNumbers,
    { provide: 'LOCALE_ID', useValue: 'ko-KR' },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BibleListComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {

  copyClipboard(arg0: any, arg1: any): string {
    return `${arg0}\n${arg1}`;
  }

  joinArray(arg: any[]): string {
    return arg.join('\n');
  }

  numberFormat(num: any) {
    return formatNumber(num, 'en-US');
  }

  title = '성서 목록';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplay = ['id', 'categoryId', 'chapter', 'verse', 'title', 'userName', 'created'];
  columnsToDisplayName = ['번호', '구분', '장', '절', '제목', '작성자', '필사일'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ICategory | null = null;
  subscription!: Subscription;
  dataSource!: MatTableDataSource<IBible>;

  categoryService = inject(CategoryService);
  bibleService = inject(BibleService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdref = inject(ChangeDetectorRef);
  bibles!: IBible[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  categories: ICategory[] = [];

  verses: ICategoryVerse[] = bibleChapters;

  biblesById(id: number) {
    let data = this.bibles.filter(x => x.categoryId === id);
    if (data.length === 0)
      this.setDatasource(data);

  }

  ngOnInit(): void {
    this.cdref.detach();
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  dataId: number = -1;

  ngAfterViewInit(): void {

    this.subscription = this.bibleService.getBibles().subscribe(data => {
      this.bibles = data;
      this.dataSource = new MatTableDataSource<IBible>(data);
      this.dataSource.paginator = this.paginator;
      this.sort?.sort({ id: 'id', start: 'desc', disableClear: false } as MatSortable);
      this.dataSource.sort = this.sort;
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.resultsLength = data.length;
    });
  }

  setDatasource(data: IBible[]) {
    this.dataSource = new MatTableDataSource<IBible>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    this.resultsLength = data.length

  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  getVerses(id: number): Array<number> {
    return this.verses.find(x => x.id === id)?.verses || [];
  }

  getCategoryName(id: number): string | undefined | null {


    return this.categories.find(x => x.id === id)?.korName;
  }

  makeTitle(element: IBible): void {
    this.title = `${element.category?.korName} (${element.chapter}:${element.verse})`;
  }

  dataFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCopyClick() {
    this.snackBar.open('클립보드에 복사되었습니다.', '닫기', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  goTo(url: string, id: number) {
    // this.router.navigate([url], { queryParams: { id: id }, relativeTo: this.route });
    this.router.navigate([url], { relativeTo: this.route, queryParams: { id: id } });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
