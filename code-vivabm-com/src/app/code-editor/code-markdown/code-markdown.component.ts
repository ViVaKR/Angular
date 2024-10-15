import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { markdown } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { MarkdownModule, MarkdownService, MermaidAPI } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-code-markdown',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule
  ],
  templateUrl: './code-markdown.component.html',
  styleUrl: './code-markdown.component.scss'
})
export class CodeMarkdownComponent implements OnInit, AfterViewInit {

  toRender() {
    this.renderToHtml();
  }

  @ViewChild('editor') editor: ElementRef;

  editorView!: EditorView;

  markdownService = inject((MarkdownService));

  rendered: any;

  async renderToHtml() {
    this.rendered = await this.markdownService.parse(this.editor.nativeElement.innerText);
  }

  ngAfterViewInit(): void {

    this.editorView = new EditorView({
      state: EditorState.create({
        doc: this.text,
        extensions: [
          basicSetup,
          markdown()
        ]
      }),
      parent: this.editor.nativeElement
    });
    this.renderToHtml();
  }

  customCommand(view: EditorView): boolean {
    console.log('custom command');
    return true;
  }

  ngOnInit(): void {
  }

  text = `
# This is a markdown document
## This is a subheading
### This is a subsubheading

> This is a blockquote
>> This is a nested blockquote
>>> This is a nested nested blockquote

 \<br\>

1. This is a list
2. This is another list
3. This is the last list

\<br\>

  `;

}
