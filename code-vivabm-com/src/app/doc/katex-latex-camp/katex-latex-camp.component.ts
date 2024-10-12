import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { KatexOptions, MarkdownModule } from 'ngx-markdown';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import katex from 'katex';
import { VivEditorComponent } from "../../viv-editor/viv-editor.component";

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
    VivEditorComponent
  ],
  templateUrl: './katex-latex-camp.component.html',
  styleUrl: './katex-latex-camp.component.scss'
})
export class KatexLatexCampComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @Input() title: string = 'Markdown Camp';

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

  mathExpressions = [
    "c = \\pm\\sqrt{a^2 + b^2}",
    "n! = 1 \\times 2 \\times 3 \\times 4 \\ldots n",
    "n! = \\ prod_{k=1}^n k",
    "\\sqrt{2}",
    "A=\\begin{bmatrix}1&2&3\\cr4&5&6\\end{bmatrix}",
    "A=\\int_1^4\\frac{x^2}{x} dx",
  ]

  katexRender() {
    for (let i = 0; i < this.mathExpressions.length; i++) {
      // 렌더링된 수식을 배열에 저장
      this.renderedMathExpressions.push(katex.renderToString(this.mathExpressions[i]));
    }
    this.cdref.detectChanges(); // 수동으로 변경 감지 트리거
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


  ngOnInit(): void {
  }

  // nodes와 marks를 클래스 속성으로 정의
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.katexRender();
    });

  }

  ngAfterContentChecked(): void {
    // this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
  }
}
