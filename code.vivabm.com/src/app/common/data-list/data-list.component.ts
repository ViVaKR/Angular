import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { merge, startWith, Subscription, switchMap } from 'rxjs';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HighlightAuto, Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { TextareaAutoresizeDirective } from '@app/directives/textarea-autoresize.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryService } from '@app/services/category.service';
import { ICategory } from '@app/interfaces/i-category';
import { CustomSlicePipe } from '@app/pipes/custom-slice.pipe';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    ClipboardModule,
    MatPaginator,
    MatSort,
    MatSortModule,
    MatFormFieldModule,
    Highlight,
    HighlightAuto,
    HighlightLineNumbers,
    TextareaAutoresizeDirective,
    NgIf,
    NgFor,
    NgForOf,
    MatIconModule,
    MatTableModule,
    MatCardTitle,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatLabel,
    MatInputModule,
    MatExpansionModule,
    CustomSlicePipe,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTooltip
  ],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss',
  providers: [HighlightAuto, HighlightLineNumbers,
    { provide: 'LOCALE_ID', useValue: 'ko-KR' },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ]
})
export class DataListComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input() title?: string;
  columns = ["id", "title", "categoryId", "userName", "created"];
  alias = ["번호", "제목", "카테고리", "작성자", "작성일"];
  widths = ["5%", "50%", "15%", "15%", "15%"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rowsSize: number = 25;
  readOnly: boolean = true;
  dataSource!: MatTableDataSource<ICode>;

  backColor = 'red';

  fontSize = 'text-lg';
  codeSubscription!: Subscription;

  columnsToDisplayWithExpand = [...this.columns, 'expand'];
  expandedElement!: ICode | null;

  codeService = inject(CodeService);
  snackBar = inject(MatSnackBar);
  announcer = inject(LiveAnnouncer);
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  categories: ICategory[];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  goTo(url: string, id: any) {

    this.router.navigate(['/Code/CodeRead'], { relativeTo: this.route, queryParams: { id: id } });
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }

  ngAfterViewInit(): void {
    this.codeSubscription = this.codeService.getCodes().subscribe({
      next: (codes: ICode[]) => {
        this.dataSource = new MatTableDataSource<ICode>(codes);
        this.dataSource.paginator = this.paginator;
        this.sort?.sort({ id: 'id', start: 'desc', disableClear: false } as MatSortable);
        this.dataSource.sort = this.sort;

        this.sort.sortChange.subscribe((s) => {
          this.paginator.pageIndex = 0;
        });
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = codes.length;
      }
    });

  }

  getCategoryName(id: number | null | undefined): string {
    if (this.categories === undefined) return "-";
    if (id === undefined || id === null) return "-";
    return this.categories.find((category) => category.id === id).name;
  }

  sortChange(state: Sort) {
    if (state.direction) {
      this.announcer.announce(`정렬 순서가 ${state.direction}로 변경되었습니다.`);
    } else {
      this.announcer.announce(`정렬 순서가 초기화 되었습니다.`);
    }
  }

  codeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  copyToClipboard(): void {
    this.snackBar.open('클립보드에 복사되었습니다.', '닫기');
  }

  exec(element: ICode) {
    this.title = element.title;
  }

  ngOnDestroy(): void {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
  }
}
