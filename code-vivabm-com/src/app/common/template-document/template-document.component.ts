import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { MarkdownModule, MermaidAPI } from 'ngx-markdown';
import katex from 'katex';
import * as mermaid from 'mermaid';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-template-document',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule
  ],
  templateUrl: './template-document.component.html',
  styleUrl: './template-document.component.scss'
})
export class TemplateDocumentComponent implements AfterViewInit {

  @Input() title: string;

  @Input() document: string;

  @ViewChild('mathContainer', { static: false }) mathContainer: ElementRef;

  readonly clipboardButton = ClipboardButtonComponent;

  expression: string = 'c = \\pm\\sqrt{a^2 + b^2}';

  @ViewChild('markdown') markdown: ElementRef;

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

    // 마크다운 (#markdown) 자식 요소 중 code block 의 background-color  스타일을 변경한다.


  }

  onCopyToClipboard() { }

}
