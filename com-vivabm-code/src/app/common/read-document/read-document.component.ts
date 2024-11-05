import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule, MermaidAPI } from 'ngx-markdown';
import { ClipboardButtonComponent } from '../clipboard-button/clipboard-button.component';
import katex from 'katex';
import * as mermaid from 'mermaid';
import { ActivatedRoute } from '@angular/router';
import { IMenu } from '@app/interfaces/i-menu';

@Component({
  selector: 'app-read-document',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
  ],
  templateUrl: './read-document.component.html',
  styleUrl: './read-document.component.scss'
})
export class ReadDocumentComponent implements AfterViewInit {

  @Input() title: string = 'Document';

  @Input() documentSrc: string = '/mermaid.readme.md';

  @ViewChild('mathContainer', { static: false }) mathContainer: ElementRef;

  expression: string = 'c = \\pm\\sqrt{a^2 + b^2}';

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
        this.title = title;
        this.menuId = id;
        this.menuParam = param;
      },
      error: (error) => {
        this.menuId = 0;
        this.menuParam = false;
        this.title = 'Document';
      }
    });
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

    katex.render(this.expression, this.mathContainer.nativeElement, {
      throwOnError: false
    });
  }
  onCopyToClipboard() { }
}
