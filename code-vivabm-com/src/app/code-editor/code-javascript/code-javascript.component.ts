import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { Command, keymap } from '@codemirror/view';

@Component({
  selector: 'app-code-javascript',
  standalone: true,
  imports: [],
  templateUrl: './code-javascript.component.html',
  styleUrl: './code-javascript.component.scss'
})
export class CodeJavascriptComponent implements OnInit, AfterViewInit {

  @ViewChild('editorJs') editorJs: ElementRef;

  editorView!: EditorView;

  completions(context: CompletionContext) {
    return {
      from: context.pos,
      to: context.pos,
      options: [
        { label: 'foo', type: 'variable' },
        { label: 'bar', type: 'function' },
        { label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" }
      ]
    };
  }


  ngAfterViewInit(): void {
    this.editorView = new EditorView({
      state: EditorState.create({
        doc: this.text,
        extensions: [
          basicSetup,
          javascript(),
          autocompletion({
            override: [this.completions]
          }),
          keymap.of([
            { key: 'Alt-Ctrl-Space', run: this.customCommand }
          ])
        ]
      }),
      parent: this.editorJs.nativeElement
    });
  }

  customCommand(view: EditorView): boolean {
    console.log('custom command');
    return true;
  }

  ngOnInit(): void {
  }

  text = `
console.log("Hello, World!");

function demo() {
  const numer = 123;
  console.log(\`Hi \${ number } \`););
}
  `;

}
