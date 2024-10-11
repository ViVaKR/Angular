import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { KatexOptions, MarkdownModule, MermaidAPI } from 'ngx-markdown';
import katex from 'katex';
import * as mermaid from 'mermaid';
import * as joypixels from 'emoji-toolkit/emoji.json';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-markdown-camp',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './markdown-camp.component.html',
  styleUrl: './markdown-camp.component.scss'
})
export class MarkdownCampComponent implements AfterViewInit, AfterContentChecked {

  @Input() title: string = 'Markdown Camp';
  @Input() documentSrc: string = '/markdown.readme.md';
  @ViewChild('mathContainer', { static: false }) mathContainer: ElementRef;

  expression: string = 'c = \\pm\\sqrt{a^2 + b^2}';

  markdownContent: string = 'Hello, world! :smile:';

  mermainOptions: MermaidAPI.Config;

  readonly clipboardButton = ClipboardButtonComponent;

  route = inject(ActivatedRoute);

  menuId: number;

  menuParam: boolean;

  constructor() {
    this.route.queryParams.subscribe({
      next: (params) => {
        const id = params['id'];
        const title = params['title'];
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

  cdref = inject(ChangeDetectorRef);
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  mathExpressions = [
    "c = \\pm\\sqrt{a^2 + b^2}",
    "n! = 1 \\times 2 \\times 3 \\times 4 \\ldots n",
    "n! = \\ prod_{k=1}^n k",
    "\\sqrt{2}",
    "A=\\begin{bmatrix}1&2&3\\cr4&5&6\\end{bmatrix}",
    "A=\\int_1^4\\frac{x^2}{x} dx",
  ]

  renderedMathExpressions: string[] = [];

  katexRender() {
    for (let i = 0; i < this.mathExpressions.length; i++) {
      // 렌더링된 수식을 배열에 저장
      this.renderedMathExpressions.push(katex.renderToString(this.mathExpressions[i]));
    }
  }
  public options: KatexOptions = {
    displayMode: true,
    throwOnError: false,
    errorColor: '#cc0000',
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
      { left: '$', right: '$', display: false }
    ]
  };

  ngAfterViewInit(): void {
    mermaid.default.initialize({
      startOnLoad: true,
      theme: MermaidAPI.Theme.Base,
      logLevel: 'error',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
      },
      sequence: {
        showSequenceNumbers: true,
      },
      gantt: {
        axisFormat: '%Y/%m/%d',
      },
    });
    this.katexRender();
  }
  onCopyToClipboard() { }

}
