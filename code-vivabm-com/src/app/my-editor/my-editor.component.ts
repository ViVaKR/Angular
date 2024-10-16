import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Editor, NgxEditorModule, Toolbar, ToolbarItem } from 'ngx-editor';

@Component({
  selector: 'app-my-editor',
  standalone: true,
  imports: [
    NgxEditorModule,
    FormsModule,
    MatButtonModule,
    JsonPipe
  ],
  templateUrl: './my-editor.component.html',
  styleUrl: './my-editor.component.scss'
})
export class MyEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  editor: Editor;

  html!: any;

  @Output() sendData = new EventEmitter<string>();
  @Input() hideMenu: any = true;

  clear() {
    this.editor.setContent('');
    this.sendData.emit('');
  }

  ok() {
    // this.sendData.emit(this.html.content[0].content[0].text);

    const content = this.extractText(this.html);
    this.sendData.emit(content);
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  private extractText(html: any): string {
    let text = '';
    if (html && html.content) {
      for (const block of html.content) {
        if (block.content) {
          for (const inline of block.content) {
            if (inline.text) {
              text += inline.text;
            }
          }
        }
        text += '\n\n'; // 각 블록 사이에 줄바꿈 추가
      }
    }
    return text; // 마지막 줄바꿈 제거
  }

  ngAfterViewInit(): void {
    this.editor.valueChanges.subscribe({
      next: (value) => {
        this.html = value;
        const content = this.extractText(this.html);
        try {
          this.sendData.emit(content);
        } catch (error) {
          //
        }
      },
      error: (_) => { },
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    // ['code_block'], // 확장된 타입 사용
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    [{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],

    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];

}
