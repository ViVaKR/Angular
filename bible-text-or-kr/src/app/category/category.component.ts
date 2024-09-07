import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { formatNumber, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { bibleChapters } from '@app/bible/bible-category/bibleChapters';
import { ICategory } from '@app/interfaces/i-category';
import { ICategoryVerse } from '@app/interfaces/i-category-verse';
import { CategoryService } from '@app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
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
    ClipboardModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',

  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class CategoryComponent implements AfterViewInit, OnInit, AfterContentChecked, OnDestroy {

  title = '성서 목록';

  dataSource!: MatTableDataSource<ICategory>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplay = ['id', 'testament', 'engName', 'korName', 'chapterCount', 'verseCount'];
  columnsToDisplayName = ['순번', '구분', '영문명', '한글명', '장', '절'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ICategory | null = null;
  subscription!: Subscription;

  categoryService = inject(CategoryService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  cdref = inject(ChangeDetectorRef);

  categories!: ICategory[];

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit(): void {
    this.subscription = this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.dataSource = new MatTableDataSource<ICategory>(data);
      this.dataSource.paginator = this.paginator;
      this.sort?.sort({ id: 'id', start: 'asc', disableClear: false } as MatSortable);
      this.dataSource.sort = this.sort;
      this.sort.sortChange.subscribe(() => {
        this.paginator.pageIndex = 0;
        this.announceSortChange(this.sort);
      });
    });
  }

  ngOnInit(): void {
    this.cdref.detach();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  announceSortChange(state: Sort) {
    if (state.direction) {
      let temp = this._liveAnnouncer.announce(`정렬 순서가 ${state.direction}로 변경되었습니다.`);

    } else {
      this._liveAnnouncer.announce(`정렬 순서가 초기화 되었습니다.`);
    }
  }

  categoryVerses: ICategoryVerse[] = bibleChapters;

  getVersesList(id: number): any {
    let list = this.categoryVerses.find(x => x.id === id) as ICategoryVerse;
    let temp: string = '';
    for (let i = 0; i < list.verses.length; i++) {
      let comma = i === list.verses.length - 1 ? '' : ', ';
      temp += '<' + (i + 1) + '장:' + list.verses[i] + '절>' + comma;
    }
    return `[ ${temp} ]`;

  }

  getBibleName(element: ICategory) {
    this.title = `${element.korName} (${element.engName})`;
  }

  dataFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCopyClick() {
    this.snackBar.open('클립보드에 복사되었습니다.', '닫기');
  }

  goTo(url: string, id: number) {
    this.router.navigate([url], { queryParams: { id: id } });
  }

  formatNumber(num: any) {
    return formatNumber(num, 'en-US');
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
