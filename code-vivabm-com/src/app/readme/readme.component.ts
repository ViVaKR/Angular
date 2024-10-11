import { AfterViewInit, Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MarkdownModule, MermaidAPI } from 'ngx-markdown';
import * as katex from 'katex';
import * as mermaid from 'mermaid';
import { LoadingService } from '@app/services/loading.service';
import { ActionService } from '@app/services/action.service';
import { CodeService } from '@app/services/code.service';
import { ClipboardButtonComponent } from '../common/clipboard-button/clipboard-button.component';
import { MatButtonModule } from '@angular/material/button';
import { BlankSpaceComponent } from "../common/blank-space/blank-space.component";


@Component({
  selector: 'app-readme',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    BlankSpaceComponent
  ],
  templateUrl: './readme.component.html',
  styleUrl: './readme.component.scss'
})
export class ReadmeComponent implements OnInit, AfterViewInit {

  actionService = inject(ActionService);
  loadingService = inject(LoadingService);

  readmeSrc: string = '/mermaid.readme.md';

  mermaidOptions: MermaidAPI.Config;

  katexOptions: any;

  mermaidSrc: string = '/Mermaid.md';
  codeService = inject(CodeService);
  cdref = inject(ChangeDetectorRef);

  constructor() {
    this.loadingService.loadingOff();
    this.actionService.nextLoading(false);
    this.codeService.isElement.next(true);
  }
  ngOnInit(): void {
    //
  }
  readonly clipboardButton = ClipboardButtonComponent;
  onCopyToClipboard() {
    // 클립보드에 복사하는 로직
  }

  ngAfterViewInit(): void {
    mermaid.default.initialize({
      startOnLoad: true,
      theme: MermaidAPI.Theme.Base,
      logLevel: 1,
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
    this.cdref.detectChanges(); // ViewChild가 초기화된 후 변경 감지
  }

}
