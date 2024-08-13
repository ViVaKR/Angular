import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { Subscription } from 'rxjs';
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


@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    ClipboardModule,
    MatPaginator,
    MatSort,
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
  @Input() columnsToDisplay = ["title"];
  @Input() columnsName = ['제목'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rowsSize: number = 25;
  readOnly: boolean = true;
  dataSource!: MatTableDataSource<ICode>;

  fontSize = 'text-lg';
  codeSubscription!: Subscription;

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ICode | null;

  codeService = inject(CodeService);
  snackBar = inject(MatSnackBar);
  announcer = inject(LiveAnnouncer);

  code = ` \

  <div class="relative h-96 overflow-hidden bg-cover bg-center bg-ship bg-no-repeat p-12 text-center lg:h-screen">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-teal-950/70 bg-fixed">
      <div class="flex h-full items-center justify-center">
        <div class="text-white">
          <main class="mb-4 text-9xl max-xl:text-7xl text-slate-300 cute-font-regular max-md:text-5xl font-extrabold">
            멀어지면 새로운 땅이 보인다.
          </main>
          <p class="mb-6 text-xs clear-both text-slate-400">...</p>
          <a class="border-slate-50 border-2 px-4  py-1 rounded-full text-slate-50 hover:border-sky-400 hover:text-sky-400"
             type="button"
             role="button"
             data-twe-ripple-init
             data-twe-ripple-color="light">Text {{ myPublicIp }}</a>
        </div>
      </div>
    </div>
  </div>

  `
  ngOnInit(): void {
    // This method is intentionally left blank
  }

  ngAfterViewInit(): void {
    this.codeSubscription = this.codeService.getCodes().subscribe({
      next: (codes: ICode[]) => {
        this.dataSource = new MatTableDataSource(codes);
        this.dataSource.paginator = this.paginator;
        this.sort?.sort({ id: 'id', start: 'desc', disableClear: false } as MatSortable);
        this.dataSource.sort = this.sort;
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error, '닫기');
      }
    })
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

  getCategory(_t14: any) {
    //
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
