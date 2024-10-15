import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar, ToolbarItem } from 'ngx-editor';

// ToolbarItem 타입 확장
type ExtendedToolbarItem = ToolbarItem | 'code_block';


@Component({
  selector: 'app-my-editor',
  standalone: true,
  imports: [
    NgxEditorModule,
    FormsModule
  ],
  templateUrl: './my-editor.component.html',
  styleUrl: './my-editor.component.scss'
})
export class MyEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  editor: Editor;

  html = '';

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
  // toolbar: ExtendedToolbarItem[] = [
  //   // default value
  //   ['bold', 'italic'],
  //   ['underline', 'strike'],
  //   ['code', 'blockquote'],
  //   ['ordered_list', 'bullet_list'],
  //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //   ['link', 'image'],
  //   // or, set options for link:
  //   // [{ link: { showOpenInNewTab: false } }, 'image'],
  //   ['text_color', 'background_color'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify'],
  //   ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
  //   ['code_block'],
  //   ['superscript', 'subscript'],
  //   ['undo', 'redo'],
  // ];
  ngAfterViewInit(): void {
    //
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }

}
