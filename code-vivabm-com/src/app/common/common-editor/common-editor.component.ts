
import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject, Input, OnInit, output, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { KatexOptions, MarkdownModule, MarkdownPipeOptions, MarkdownService, MermaidAPI } from 'ngx-markdown';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import katex from 'katex';
import * as mermaid from 'mermaid';
import { marked } from 'marked';
import * as joypixels from 'emoji-toolkit/emoji.json';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-common-editor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MarkdownModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './common-editor.component.html',
  styleUrl: './common-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonEditorComponent implements OnInit, AfterViewInit, AfterContentChecked {


  @Input() placeholder: string = '입력...';
  @Input() markdownInput: any;
  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChild('markdownOutput', { static: false }) markdownOutput: ElementRef;

  output: any = '';


  markdownService = inject(MarkdownService);

  readonly data = inject(MAT_DIALOG_DATA);

  katexOptions: KatexOptions = {
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

  private indent(element: ElementRef) {
    const spaces = '    ';
    const start = element.nativeElement.selectionStart;
    const end = element.nativeElement.selectionEnd;
    const value = element.nativeElement.value;
    element.nativeElement.value = value.substring(0, start) + spaces + value.substring(end);
    element.nativeElement.selectionStart = element.nativeElement.selectionEnd = start + spaces.length;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      if (event.key === 'Tab') {
        event.preventDefault();
        this.indent(this.input);
      }
    }
  }

  toMarkdown($event: any) {
    this.output = this.markdownService.parse(this.markdownInput);
  }

  // private extractText(html: any): string {
  //   let text = '';
  //   if (html && html.content) {
  //     for (const block of html.content) {
  //       if (block.content) {
  //         for (const inline of block.content) {
  //           if (inline.text) {
  //             text += inline.text;
  //           }
  //         }
  //       }
  //       text += '\n\n'; // 각 블록 사이에 줄바꿈 추가
  //     }
  //   }
  //   return text; // 마지막 줄바꿈 제거
  // }

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

  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  cdref = inject(ChangeDetectorRef);
  ngOnInit(): void { }
}
