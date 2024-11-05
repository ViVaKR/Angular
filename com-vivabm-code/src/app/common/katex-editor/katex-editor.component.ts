import { AfterViewInit, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EditorView } from 'codemirror';
import { MarkdownModule, MarkdownService, MermaidAPI } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MyEditorComponent } from '@app/my-editor/my-editor.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-katex-editor',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    MyEditorComponent
  ],
  templateUrl: './katex-editor.component.html',
  styleUrl: './katex-editor.component.scss'
})
export class KatexEditorComponent implements AfterViewInit {

  @Input() placeholder: string = '입력...';

  readonly data = inject(MAT_DIALOG_DATA);

  editorView!: EditorView;

  markdownService = inject((MarkdownService));

  rendered: any;

  async rederToText(text: string) {
    this.rendered = await this.markdownService.parse(text);
  }

  ngAfterViewInit(): void { }

  receiveData($event: string) {
    this.rederToText($event);
  }

}
