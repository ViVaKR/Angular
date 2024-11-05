import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { KatexOptions, MarkdownModule } from 'ngx-markdown';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import katex from 'katex';
import renderMathInElement from 'katex/contrib/auto-render';
import { CodeEditorComponent } from "../../code-editor/code-editor.component";
import { MyEditorComponent } from "../../my-editor/my-editor.component";
import { KatexEditorComponent } from "../../common/katex-editor/katex-editor.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IMathData, MathData } from '@app/data/math-data';

@Component({
  selector: 'app-katex-latex-camp',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CodeEditorComponent,
    MyEditorComponent,
    KatexEditorComponent,
    MatIconModule,

  ],
  templateUrl: './katex-latex-camp.component.html',
  styleUrl: './katex-latex-camp.component.scss'
})
export class KatexLatexCampComponent implements OnInit, AfterViewInit, AfterContentChecked {

  readonly dialog = inject(MatDialog);

  openDialog(data: any) {

    const dialogRef = this.dialog.open(KatexEditorComponent, {
      width: '100vw',
      maxWidth: '100vh',
      position: { right: '0', bottom: '0' },
      data: data
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  isHide($event: boolean) {
    this.hideEditor = $event;
  }

  @Input() title: string = 'Katex (수학식) Camp';

  form = new FormGroup('');

  route = inject(ActivatedRoute);
  cdref = inject(ChangeDetectorRef);

  menuId: number;
  menuParam: boolean;

  @ViewChild('myCode') myCode: ElementRef;

  readonly clipboardButton = ClipboardButtonComponent;

  public katexOptions: KatexOptions = {
    displayMode: true,
    throwOnError: false,
    errorColor: '#cccc00',
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
      { left: '$', right: '$', display: false }
    ]
  };

  renderedMathExpressions: string[] = [];

  data = new MathData();
  mathA: IMathData[] = this.data.mathData;

  @ViewChild('math') math: ElementRef

  rendered: {
    desc: string
    symbol: string,
    ex: string,
    source: string,
  }[] = [];

  hideEditor: any;

  katexRender() {

    // 수식 렌더링
    for (let item of this.mathA) {
      this.rendered.push({
        desc: item.desc,
        symbol: item.symbol,
        ex: item.source,
        source: katex.renderToString(item.source),
      });
    }

    this.cdref.detectChanges(); // 수동으로 변경 감지 트리거
  }

  toKatex(source: string) {
    return katex.renderToString(source);
  }

  onCopyToClipboard() { }

  constructor() {

    this.route.queryParams.subscribe({
      next: (params) => {
        const id = params['id'];
        // const title = params['title'];
        const param = params['param'];
        // this.title = title;
        this.menuId = id;
        this.menuParam = param;
      },
      error: (_) => {
        this.menuId = 0;
        this.menuParam = false;
        this.title = 'Document';
      }
    });
  }

  ngOnInit(): void { }

  renderMath(): void {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ]
    });
  }
  // nodes와 marks를 클래스 속성으로 정의
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.katexRender();
    });
    this.mathA.sort(() => Math.random() - 0.5);
    this.renderMath();
  }

  ngAfterContentChecked(): void { }

  ngOnDestroy(): void { }
}

