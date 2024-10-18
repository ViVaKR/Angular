import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { KatexOptions, MarkdownModule, MarkdownService, MermaidAPI } from 'ngx-markdown';
import katex from 'katex';
import * as mermaid from 'mermaid';
import { marked } from 'marked';
import * as joypixels from 'emoji-toolkit/emoji.json';
import { FormsModule } from '@angular/forms';
import { MyEditorComponent } from "../../my-editor/my-editor.component";
import { CodeEditorComponent } from "../../code-editor/code-editor.component";
import { MatIconModule } from '@angular/material/icon';
import { KatexEditorComponent } from '@app/common/katex-editor/katex-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonEditorComponent } from '@app/common/common-editor/common-editor.component';

interface ICurrentData {
  title: string;
  markdown: string;
}

@Component({
  selector: 'app-markdown-camp',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    NgFor,
    NgIf,
    FormsModule,
    MyEditorComponent,
    CodeEditorComponent,
    MatIconModule
  ],
  templateUrl: './markdown-camp.component.html',
  styleUrl: './markdown-camp.component.scss'
})
export class MarkdownCampComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {

  readonly dialog = inject(MatDialog);

  openDialog(data: any) {
    const dialogRef = this.dialog.open(CommonEditorComponent, {
      width: '100vw',
      maxWidth: '100vh',
      position: { right: '0', bottom: '0' },
      data: data
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  @Input() title: string = 'Markdown Camp';
  @Input() documentSrc: string = '/markdown.readme.md';
  @ViewChild('mathContainer', { static: false }) mathContainer: ElementRef;

  mermainOptions: MermaidAPI.Config;

  readonly clipboardButton = ClipboardButtonComponent;

  route = inject(ActivatedRoute);

  menuId: number;

  menuParam: boolean;

  markdownService = inject(MarkdownService);

  katexOptions: KatexOptions;

  @ViewChild('target') target: ElementRef;

  renderer = inject(Renderer2);

  markdownData: ICurrentData[] = [
    { title: "# Heading", markdown: "# Heading", },
    { title: "## Heading", markdown: "## Heading", },
    { title: "### Heading", markdown: "### Heading", },
    { title: "#### Heading", markdown: "#### Heading", },
    { title: "##### Heading", markdown: "##### Heading", },
    { title: "###### Heading", markdown: "###### Heading", },
    { title: "**Bold**", markdown: "**Bold**", },
    { title: "---", markdown: "---", },
    { title: "*Italic*", markdown: "*italicized text*", },
    { title: "`console.log('Hello, World');`", markdown: "`console.log('Hello, World');`", },
    { title: "> Blockquote", markdown: "> blockquote", },
    { title: "Footnote [^1]", markdown: "Here's a sentence with a footnote.[^1]", },
    { title: "List", markdown: "- list", },
    { title: "- [x] Task", markdown: "- [x] task", },
    { title: "Table", markdown: "| table |", },
    { title: "Math: $$c = \\pm\\sqrt{a^2 + b^2}$$", markdown: "$$c = \\pm\\sqrt{a^2 + b^2}$$", },
    { title: "```mermaid\ngraph TD;\n  A-->B;\n  A-->C;\n  B-->D;\n  C-->D;\n```", markdown: "```mermaid\ngraph TD;\n  A-->B;\n  A-->C;\n  B-->D;\n  C-->D;\n```", },
    // { title: "Emoji :smile", markdown: ":smile", },
    { title: "~~Strikethrought~~", markdown: "~~The world is flat.~~", },
    { title: "Definition List", markdown: ": definition" },
    {
      title: "[title](https://code.vivabm.com)",
      markdown: "[Click me link](https://code.vivabm.com)",
    },
    {
      title: "![alt text](avata.png)",
      markdown: "![avatar](avata.png)"
    },
    {
      title: "Ordered List", markdown: "1. First item\n2. Second item\n3. Third item",
    },
  ];
  // temp: any;
  // menu: any;

  // currentData: ICurrentData = this.markdownData[0];
  // currentIndex: number = 0;
  cdref = inject(ChangeDetectorRef);

  // nextData(): void {
  //   this.currentIndex = (this.currentIndex + 1) % this.markdownData.length;
  //   this.currentData = this.markdownData[this.currentIndex];
  // }

  // prevData(): void {
  //   this.currentIndex = (this.currentIndex - 1 + this.markdownData.length) % this.markdownData.length;
  //   this.currentData = this.markdownData[this.currentIndex];
  // }


  // createElements() {
  //   this.markdownService.renderer.link = (href, title, text) => {
  //     return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  //   }
  //   // console.log('this.markdownService.renderer.link', this.markdownService.renderer.link('https://code.vivabm.com', 'vivabm', 'vivabm'));

  //   let alink = this.markdownService.renderer.link('https://code.vivabm.com', 'vivabm', 'vivabm');

  //   let div = document.createElement('div');
  //   div.innerHTML = alink;
  //   if (this.target) {
  //     this.renderer.appendChild(this.target.nativeElement, div);
  //   } else {
  //     console.error('Target element not found');
  //   }
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
    // this.katexRender();
    // this.createElements();
  }

  onCopyToClipboard() { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  constructor() {

    this.katexOptions = {
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

    this.route.queryParams.subscribe({
      next: (params) => {
        const id = params['id'];
        const title = params['title'];
        const param = params['param'];
        // this.title = title;
        this.menuId = id;
        this.menuParam = param;
      },
      error: (_) => {
        this.menuId = 0;
        this.menuParam = false;
        this.title = 'Document';
      }
    });


  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}

// katexRender() {
//   for (let i = 0; i < this.mathExpressions.length; i++) {
//     // 렌더링된 수식을 배열에 저장
//     this.renderedMathExpressions.push(katex.renderToString(this.mathExpressions[i]));
//   }
// }

// marked와 KaTeX를 함께 사용하여 수학 표현식을 렌더링
// marked.use({
//   renderer: {
//     text(text) {
//       return text.replace(/\$([^$]+)\$/g, (match, p1) => {
//         return katex.renderToString(p1, { throwOnError: false });
//       });
//     }
//   }
// });
// public options: KatexOptions = {
//   displayMode: true,
//   throwOnError: false,
//   errorColor: '#cccc00',
//   delimiters: [
//     { left: '$$', right: '$$', display: true },
//     { left: '\\[', right: '\\]', display: true },
//     { left: '\\(', right: '\\)', display: false },
//     { left: '$', right: '$', display: false }
//   ]
// };

// mathExpressions = [
//   "c = \\pm\\sqrt{a^2 + b^2}",
//   "n! = 1 \\times 2 \\times 3 \\times 4 \\ldots n",
//   "n! = \\ prod_{k=1}^n k",
//   "\\sqrt{2}",
//   "A=\\begin{bmatrix}1&2&3\\cr4&5&6\\end{bmatrix}",
//   "A=\\int_1^4\\frac{x^2}{x} dx",
// ]

// renderedMathExpressions: string[] = [];


// this.render.listen(this.target, 'click', (event) => {
//   console.log('event', event.target.value);
// });


// this.markdownService.renderer.strong = (text) => {
//   return `<strong>${text}</strong>`;
// }

// this.markdownService.renderer.image = (href, title, text) => {
//   return `<img src="${href}" alt="${text}" title="${title}" />`;
// }

// this.markdownService.renderer.heading = (text, level) => {
//   return `<h${level}>${text}</h${level}>`;
// }

// this.markdownService.renderer.listitem = (text, task, checked) => {
//   return `<li>${text}</li>`;
// }

// this.markdownService.renderer.list = (body, ordered) => {
//   return `<ul>${body}</ul>`;
// }

// this.markdownService.renderer.paragraph = (text) => {
//   return `<p>${text}</p>`;
// }

// this.markdownService.renderer.code = (code, lang) => {
//   return `<pre><code>${code}</code></pre>`;
// }

// this.markdownService.renderer.codespan = (code) => {
//   return `<code>${code}</code>`;
// }

// this.markdownService.renderer.blockquote = (quote) => {
//   return `<blockquote>${quote}</blockquote>`;
// }
