import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { markdown } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
// import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { MarkdownModule, MarkdownService, MermaidAPI } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MyEditorComponent } from '@app/my-editor/my-editor.component';

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
export class KatexEditorComponent {

  receiveData($event: string) {
    this.rederToText($event);
  }

  editorView!: EditorView;

  markdownService = inject((MarkdownService));

  rendered: any;

  async rederToText(text: string) {
    this.rendered = await this.markdownService.parse(text);
  }
  ngAfterViewInit(): void {

  }
}
