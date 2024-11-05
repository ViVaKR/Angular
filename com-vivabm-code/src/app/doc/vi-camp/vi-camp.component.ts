import { AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";
import { MarkdownCampComponent } from '../markdown-camp/markdown-camp.component';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import katex from 'katex';
import * as mermaid from 'mermaid';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { KatexOptions, MarkdownModule, MarkdownService, MermaidAPI } from 'ngx-markdown';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vi-camp',
  standalone: true,
  imports: [
    MarkdownCampComponent,
    MatButtonModule,
    MarkdownModule,
    NgFor,
    NgIf,
    PreparingComponent],
  templateUrl: './vi-camp.component.html',
  styleUrl: './vi-camp.component.scss'
})
export class ViCampComponent implements OnInit, AfterViewInit {
  @Input() title: any = 'Vim Camp';

  @Input() documentSrc: string = '/vim.readme.md';

  @Input() message: any = 'Vim 훈련소 서비스 중입니다.';

  markdownService = inject(MarkdownService);

  mermainOptions: MermaidAPI.Config;

  readonly clipboardButton = ClipboardButtonComponent;

  route = inject(ActivatedRoute);

  menuId: number;

  menuParam: boolean;

  public options: KatexOptions = {
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

  markDownRendered!: any;
  ngOnInit(): void {
    this.markDownRendered = this.markdownService.parse("__Hello, World!__");
  }


  cdref = inject(ChangeDetectorRef);

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  katexRender() {
    // for (let i = 0; i < this.mathExpressions.length; i++) {
    //   // 렌더링된 수식을 배열에 저장
    //   this.renderedMathExpressions.push(katex.renderToString(this.mathExpressions[i]));
    // }
  }
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
