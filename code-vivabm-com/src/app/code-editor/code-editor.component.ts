import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Compartment, EditorState } from '@codemirror/state';
import * as CodeMirror from 'codemirror';
import {
  drawSelection,
  highlightActiveLine, highlightActiveLineGutter,
  highlightSpecialChars, keymap
} from '@codemirror/view';

import { defaultKeymap, historyKeymap, history } from '@codemirror/commands';
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  defaultHighlightStyle, HighlightStyle,
  language,
  syntaxHighlighting, TagStyle
} from '@codemirror/language';

import { classHighlighter, highlightTree, tags } from '@lezer/highlight';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import hljs from 'highlight.js/lib/core';
import { MatSelectModule } from '@angular/material/select';
import { basicSetup, EditorView } from "codemirror"
import { html, htmlLanguage } from '@codemirror/lang-html';
import { csharp } from "@replit/codemirror-lang-csharp";
import { CodeJavascriptComponent } from "./code-javascript/code-javascript.component";
import { CodeMarkdownComponent } from "./code-markdown/code-markdown.component";

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    CodeJavascriptComponent,
    CodeMarkdownComponent
  ],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild('editorCsharp') editorCsharpEl: ElementRef;
  @ViewChild('editorJs') editorJs: ElementRef;

  editorView!: EditorView;

  ngAfterViewInit(): void {

    // const customHighlightStyle = HighlightStyle.define([
    //   { tag: tags.keyword, color: '#007acc' }, // 키워드 색상
    //   { tag: tags.string, color: '#d69d85' }, // 문자열 색상
    //   { tag: tags.variableName, color: '#9cdcfe' }, // 변수 이름 색상
    //   { tag: tags.function(tags.variableName), color: '#dcdcaa' }, // 함수 이름 색상
    //   { tag: tags.comment, color: '#6a9955', fontStyle: 'italic' }, // 주석 색상
    // ]);


    //   new EditorView({
    //     state: EditorState.create({
    //       doc: `
    //   using System;
    //   namespace Test
    //   {
    //     class Program
    //     {
    //       public static void Main(string[] args)
    //       {
    //         Console.WriteLine("Hello, world! This is C#.");
    //       }
    //     }
    //   }
    //   `,
    //       extensions: [
    //         basicSetup,
    //         csharp()],
    //     }),
    //     parent: document.querySelector('#editorCsharp'),
    //   });
  }

  // ngOnInit() { }
}
// const state = EditorState.create({
//   doc: 'onsole.log("Hello, World!");\n\nfunction demo() {\n  console.log("Hi");\n}',
//   extensions: [
//     syntaxHighlighting(customHighlightStyle),
//   ]
// });

// EditorView.updateListener.of(update => {
//   if (update.docChanged) {
//     this.editorTextarea.nativeElement.value = this.editorView.state.doc.toString();
//     // const code = this.editorEl.nativeElement.innerText;
//     // const result = hljs.highlightAuto(code, ['csharp']);
//     // this.editorEl.nativeElement.innerHTML = result.value;
//   }
// })
// const languageConf = new Compartment;

// const autoLanguage = EditorState.transactionExtender.of(tr => {
//   if (!tr.docChanged) return null
//   let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100))
//   let stateIsHTML = tr.startState.facet(language) == htmlLanguage
//   if (docIsHTML == stateIsHTML) return null
//   return {
//     effects: languageConf.reconfigure(docIsHTML ? html() : javascript())
//   }
// });

// import csharp from 'highlight.js/lib/languages/csharp';
// hljs.registerLanguage('csharp', csharp);

// CodeMirror.runMode(document.getElementById("preview-form- comment").value, "text / x - csrc", document.getElementById('preview- comment'));

// const code = this.editorEl.nativeElement.innerText;
// const tree = javascriptLanguage.parser.parse(code);
// console.log(tree);
// highlightTree(tree, classHighlighter, (from, to, classes) => {
//   const span = document.createElement('span');
//   span.className = classes;
//   span.textContent = code.slice(from, to);
//   this.editorRunEl.nativeElement.appendChild(span);

//   console.log(span);
// });

// editorEl 에 있는 자바스크립트 코드를  Codemirror 로 실행하여 결과를 editorRunEl 에 출력
// new EditorView({
//   state: EditorState.create({
//     doc: `
// function hello() {
//   console.log("Hello, world! This is JavaScript.");
// }
// `,
//     extensions: [basicSetup, javascript()],
//   }),
//   parent: this.editorCsharpEl.nativeElement,
// });

// initializeEditor(language: string): void {
//   const customHighlightStyle = HighlightStyle.define([
//     { tag: tags.keyword, color: '#007acc' }, // 키워드 색상
//     { tag: tags.string, color: '#d69d85' }, // 문자열 색상
//     { tag: tags.variableName, color: '#9cdcfe' }, // 변수 이름 색상
//     { tag: tags.function(tags.variableName), color: '#dcdcaa' }, // 함수 이름 색상
//     { tag: tags.comment, color: '#6a9955', fontStyle: 'italic' }, // 주석 색상
//   ]);

//   const languageExtension = this.getLanguageExtension(language);

//   const state = EditorState.create({
//     doc: 'console.log("Hello, World!");\n\nfunction demo() {\n  console.log("Hi");\n}',
//     extensions: [
//       keymap.of([...defaultKeymap, ...historyKeymap]),
//       highlightSpecialChars(),
//       drawSelection(),
//       history(),
//       syntaxHighlighting(customHighlightStyle),
//       languageExtension,
//       oneDark,
//       EditorView.lineWrapping,
//       highlightActiveLine(),
//       highlightActiveLineGutter(),
//       EditorView.updateListener.of(update => {
//         if (update.docChanged) {
//           const code = this.editorEl.nativeElement.innerText;
//           const result = hljs.highlightAuto(code, [language]);
//           this.editorEl.nativeElement.innerHTML = result.value;
//         }
//       })
//     ]
//   });

//   if (this.editorView) {
//     this.editorView.setState(state);
//   } else {
//     this.editorView = new EditorView({
//       state,
//       parent: this.editorEl.nativeElement
//     });
//   }

//   // highlight.js를 사용하여 구문 강조
//   const code = this.editorEl.nativeElement.innerText;
//   const result = hljs.highlightAuto(code, [language]);
//   this.editorEl.nativeElement.innerHTML = result.value;
// }

// getLanguageExtension(language: string) {
//   switch (language) {
//     case 'javascript':
//       return javascript();
//     case 'python':
//     // return python();
//     case 'csharp':
//       return {
//         // C# 구문 강조를 위한 사용자 정의 확장
//         // 현재 CodeMirror에서 C#을 직접 지원하지 않으므로 highlight.js를 사용
//       };
//     default:
//       return javascript();
//   }
// }

// onLanguageChange(language: string): void {
//   this.initializeEditor(language);
// }
