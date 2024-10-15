import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { MarkdownModule, MermaidAPI } from 'ngx-markdown';
import katex from 'katex';
import * as mermaid from 'mermaid';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mermaid-camp',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
  ],
  templateUrl: './mermaid-camp.component.html',
  styleUrl: './mermaid-camp.component.scss'
})
export class MermaidCampComponent implements AfterViewInit {

  @Input() title: string = 'Mermaid Camp';

  @Input() documentSrc: string = '/mermaid.readme.md';

  @ViewChild('mathContainer', { static: false }) mathContainer: ElementRef;

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

    // katex.render(this.expression, this.mathContainer.nativeElement, {
    //   throwOnError: false
    // });
  }
  onCopyToClipboard() { }
}
