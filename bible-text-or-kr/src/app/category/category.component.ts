import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { formatNumber, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ICategory } from '@app/interfaces/i-category';
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
export class CategoryComponent implements OnInit {

  formatNumber(num: any) {
    return formatNumber(num, 'en-US');
  }
  editCategory(arg0: any) {
    throw new Error('Method not implemented.');
  }
  title = '성서 목록';

  dataSource!: MatTableDataSource<ICategory>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplay = ['id', 'testament', 'engName', 'korName', 'chapterCount', 'verseCount'];
  columnsToDisplayName = ['순번', '구분', '영문명', '한글명', '장', '절'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ICategory | null = null;
  subscription!: Subscription;

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.subscription = this.categoryService.getCategories().subscribe(data => {
      this.dataSource = new MatTableDataSource<ICategory>(data);
      this.dataSource.paginator = this.paginator;
      this.sort?.sort({ id: 'id', start: 'asc', disableClear: false } as MatSortable);
      this.dataSource.sort = this.sort;
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    });
  }

  getBibleName(element: ICategory) {
    console.log(element);
    this.title = `${element.korName} (${element.engName})`;
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
    this.router.navigate([url], { queryParams: { id: id } });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
