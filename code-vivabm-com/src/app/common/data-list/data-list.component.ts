import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HighlightAuto, Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { TextareaAutoresizeDirective } from '@app/directives/textarea-autoresize.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JsonPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryService } from '@app/services/category.service';
import { ICategory } from '@app/interfaces/i-category';
import { CustomSlicePipe } from '@app/pipes/custom-slice.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryModel } from '@app/category/category.model';
import { environment } from '@env/environment.development';
import { Subscription } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MarkdownModule } from 'ngx-markdown';
import { FileManagerService } from '@app/services/file-manager.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActionService } from '@app/services/action.service';
import { LoadingService } from '@app/services/loading.service';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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
    MatTooltip,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MarkdownModule
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

  markdownTitle = '# Markdown';
  baseUrl = environment.baseUrl;
  @Input() title?: string;
  @Input() userId?: string | null | undefined;
  public columns: string[] = ["id", "title", "categoryId", "userName", "created"];
  public alias = ["번호", "제목", "카테고리", "작성자", "작성일"];

  isMobile: boolean = false;
  screenWidth: number = 768;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;


  rowsSize: number = 15;
  readOnly: boolean = true;
  registered: boolean = true;
  fontSize = 'text-lg';
  dataSource!: MatTableDataSource<ICode>;
  codeSubscription!: Subscription;
  columnsToDisplayWithExpand = [...this.columns, 'expand'];
  expandedElement!: ICode | null;
  codeService = inject(CodeService);
  dataService = inject(DataService);
  snackBar = inject(MatSnackBar);
  announcer = inject(LiveAnnouncer);
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  categoryModelService = inject(CategoryModel);
  actionService = inject(ActionService);

  categorySubscription: Subscription = new Subscription();

  isLogin: boolean = false;
  isLoading = true;

  goTo(id: number): void {
    this.router.navigate(['../CodeRead'], { relativeTo: this.route, queryParams: { id: id } });
  }

  constructor() {
    this.isMobile = window.innerWidth < this.screenWidth;
    this.isLogin = this.userId !== null || this.userId !== undefined;
  }

  ngOnInit(): void {
    this.categoryModelService.setCategories();
    (this.userId == null || this.userId == undefined) ? this.setCodes() : this.setMyCodes();
  }

  loadingService = inject(LoadingService);
  setCodes() {

    this.codeSubscription = this.codeService.getCodes().subscribe({
      next: (codes: ICode[]) => {
        this.dataSource = new MatTableDataSource<ICode>(codes);
        this.dataSource.paginator = this.paginator;
        this.sort?.sort({ id: 'id', start: 'desc', disableClear: false } as MatSortable);
        this.dataSource.sort = this.sort;
        this.sort?.sortChange.subscribe((_) => { this.paginator.pageIndex = 0; });
        this.loadingService.loadingOff();
        this.actionService.nextLoading(false);
      },
      error: (_) => {

        this.actionService.nextLoading(false);
      }
    });

  }

  setMyCodes() {
    this.codeSubscription = this.codeService.getMyCodes(this.userId).subscribe({
      next: (codes: ICode[]) => {
        if (codes === null || codes === undefined || codes.length === 0) {
          this.snackBar.open('등록된 코드가 없습니다.', '닫기', {
            duration: 2000,
          });
          this.actionService.nextLoading(false);
          return;
        }
        this.registered = true;
        this.dataSource = new MatTableDataSource<ICode>(codes);
        this.dataSource.paginator = this.paginator;
        this.sort?.sort({ id: 'id', start: 'desc', disableClear: false } as MatSortable);
        this.dataSource.sort = this.sort;
        this.sort?.sortChange.subscribe((_) => { this.paginator.pageIndex = 0; });
        this.isLoading = false;

        this.loadingService.loadingOff();
        this.actionService.nextLoading(false);
      },
      error: (_) => {
        this.isLoading = false;

        this.loadingService.loadingOff();
        this.actionService.nextLoading(false);
      }
    });
  }

  ngAfterViewInit() {
  }

  getCategoryName(id: number): string {
    return this.categoryModelService.getCategoryName(id);
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

  loadCodes(): void {
    this.codeSubscription = this.codeService.getCodes().subscribe({
      next: (codes: ICode[]) => {
        this.dataSource = new MatTableDataSource<ICode>(codes);
        this.dataSource.paginator = this.paginator;
        this.sort?.sort({ id: 'id', start: 'desc', disableClear: false } as MatSortable);
        this.dataSource.sort = this.sort;
        this.sort?.sortChange.subscribe((_) => { this.paginator.pageIndex = 0; });
        this.isLoading = false;
        this.actionService.nextLoading(false);
      },
      error: (_) => {
        this.isLoading = false;
        this.actionService.nextLoading(false);
      }
    });
  }

  loadMore(): void {
    this.rowsSize += this.rowsSize;
    this.paginator.pageSize = this.rowsSize;
  }

  copyToClipboard(): void {
    this.snackBar.open('클립보드에 복사되었습니다.', '닫기');
  }

  getAttachImage(imageName: string): string {
    if (imageName === '' || imageName === null || imageName === undefined) {
      return `no-image.svg`;
    }
    return `${this.baseUrl}/images/Attach/${imageName}`;
  }

  exec(element: ICode) {
    this.title = element.title;
  }

  fileService = inject(FileManagerService);
  downloadCodeFile(fileUrl: string) {
    this.fileService.downloadCodeFile(fileUrl).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this.downloadFile(event, fileUrl);
      }
    });
  }

  /// 첨부된 파일 다운로드
  downloadFile(data: HttpResponse<Blob>, fileUrl: string) {
    const downloadFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileUrl;
    a.href = URL.createObjectURL(downloadFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  ngOnDestroy(): void {
    if (this.codeSubscription)
      this.codeSubscription.unsubscribe();
    if (this.categorySubscription)
      this.categorySubscription.unsubscribe();
    this.codeService.isElement.next(false);
  }
}
