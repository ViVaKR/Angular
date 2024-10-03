import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TextareaAutoresizeDirective } from '@app/directives/textarea-autoresize.directive';
import { ICode } from '@app/interfaces/i-code';
import { CustomSlicePipe } from '@app/pipes/custom-slice.pipe';
import { environment } from '@env/environment.development';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { MarkdownModule } from 'ngx-markdown';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatExpansionModule } from '@angular/material/expansion';
import { ICategory } from '@app/interfaces/i-category';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActionService } from '@app/services/action.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
    MatTooltip,
    MatTableModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HighlightAuto,
    HighlightLineNumbers,
    TextareaAutoresizeDirective,
    MarkdownModule,
    CustomSlicePipe,
    MatInputModule,
    MatPaginator,
    MatSortModule,
    NgIf,
    NgFor,
    MatExpansionModule,
    MatProgressSpinner
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
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
export class DataComponent implements OnInit, AfterViewInit {

  @Input() title = 'Data List';

  resolvedData: ICode[] = [];
  resolvedCategory: ICategory[] = [];

  route = inject(ActivatedRoute);
  announcer = inject(LiveAnnouncer);
  actionService = inject(ActionService);

  categories!: ICategory[];

  dataSource!: MatTableDataSource<ICode>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ICode>;

  baseUrl = environment.baseUrl;
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  rowsSize: number = 50;
  readOnly: boolean = true;
  fontSize = 'text-lg';

  columns: string[] = ["id", "title", "categoryId", "userName", "created"];
  alias = ["번호", "제목", "카테고리", "작성자", "작성일"];

  expandedElement!: ICode | null;
  columnsToDisplayWithExpand = [... this.columns, 'expand'];

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data["resolvedData"];
    this.resolvedCategory = this.route.snapshot.data["resolvedCategory"];
  }

  ngAfterViewInit(): void {
    this.categories = this.resolvedCategory;
    this.dataSource = new MatTableDataSource<ICode>(this.resolvedData);
    this.dataSource.paginator = this.paginator;
    this.sort?.sort({ id: 'id', start: 'desc', disableClear: false } as MatSortable);
    this.dataSource.sort = this.sort;
    this.sort?.sortChange.subscribe((_) => { this.paginator.pageIndex = 0; });
    this.actionService.nextLoading(false);
  }

  getCategoryName(id: number): string {
    return this.categories.find((category) => category.id === id)?.name || '';
  }

  sortChange(state: Sort) {
    if (state.direction) {
      this.announcer.announce(`정렬 순서가 ${state.direction}로 변경되었습니다.`);
    } else {
      this.announcer.announce(`정렬 순서가 초기화 되었습니다.`);
    }
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
  downloadCodeFile(fileUrl: string) {
    // this.fileService.downloadCodeFile(fileUrl).subscribe((event) => {
    //   if (event.type === HttpEventType.Response) {
    //     this.downloadFile(event, fileUrl);
    //   }
    // });
  }

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
  copyToClipboard() {
    // TODO: Implement this method
  }
  goTo(id: number) {
    this.router.navigate(['../CodeRead'], { relativeTo: this.route, queryParams: { id: id } });
  }

  codeFilter($event: KeyboardEvent) {
    // TODO: Implement this method

  }
}
