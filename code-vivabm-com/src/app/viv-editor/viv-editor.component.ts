import { CommonModule, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation, inject, isDevMode } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Validators, Editor, Toolbar, DEFAULT_TOOLBAR, NgxEditorModule, toHTML, toDoc } from 'ngx-editor';
import jsonDoc from './doc';
import schema from './schema';
import { Plugin, PluginKey } from 'prosemirror-state';
// import { schema } from 'ngx-editor/schema'
import nodeViews from './nodeviews';
import { CustomMenuComponent } from './custom-menu/custom-menu.component';
import { MatButtonModule } from '@angular/material/button';
import katex from 'katex';
import { KatexOptions, MarkdownModule } from 'ngx-markdown';
import { ClipboardButtonComponent } from '@app/common/clipboard-button/clipboard-button.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrintErrorComponent } from '@app/common/print-error/print-error.component';
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";

@Component({
  selector: 'app-viv-editor',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    CustomMenuComponent,
    MatButtonModule,
    NgIf,
    NgFor,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    PrintErrorComponent,
    SafeHtmlPipe
  ],
  templateUrl: './viv-editor.component.html',
  styleUrl: './viv-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }
  ]
})
export class VivEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  datePipe = inject(DatePipe);
  router = inject(Router);
  route = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  authService = inject(AuthService);

  isDevMode = isDevMode();

  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

  myId: string = '';
  myName: string = '';
  myIp: string = '0.0.0.0';

  @ViewChild('katex') katexEl!: ElementRef;
  @ViewChild('markdown') markdownEl!: ElementRef;

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
        // 4개의 공백을 넣는다.
        switch (event.target) {
          case this.markdownEl.nativeElement:
            this.indent(this.markdownEl);
            break;
          case this.katexEl.nativeElement:
            this.indent(this.katexEl);
            break;
          default: break;
        }
      }
    }
  }


  editor: Editor;

  toolbar: Toolbar = DEFAULT_TOOLBAR;

  fontSize = "1rem";
  rows = 3;

  // editordoc = jsonDoc;
  katexString = '\\rightarrow c = \\pm\\sqrt{a^2 + b^2}';
  markdownString = 'c = \\pm\\sqrt{a^2 + b^2}';
  htmlString = '<span class="math inline">c = \\pm\\sqrt{a^2 + b^2}</span>';

  fb = inject(FormBuilder);
  form!: FormGroup;

  newForm(): void {
    this.form = this.fb.group({
      katex: [this.katexString],
      markdown: [this.markdownString],
      html: [{ value: this.htmlString, disabled: false }]
    });
  }

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  constructor() {
    this.myId = this.authService.getUserDetail().id;
    this.myName = this.authService.getUserDetail().fullName;
    this.newForm();
  }
  ngOnInit(): void {

    this.editor = new Editor({
      schema,
      nodeViews,
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      attributes: { enterkeyhint: 'enter' },
      features: {
        linkOnPaste: true,
        resizeImage: true,
      },
    });
    this.editor.registerPlugin(new Plugin({
      key: new PluginKey('plugin'),
    }));

    // this.html = toHTML(this.editordoc, schema);
    // this.js = toDoc(this.html, schema);
  }

  ngAfterViewInit(): void {

  }

  sanitizer = inject(DomSanitizer); // DomSanitizer
  sanitizeContent(content: string): SafeHtml { // 안전한 HTML로 변환
    return this.sanitizer.bypassSecurityTrustHtml(content);

    /*
    사용법 :
    <div [innerHtml]="sanitizeContent(content.nativeElement.value)"></div>
    */
  }


  onCancel() {
    this.router.navigate(['']);
  }
  onReset() {
    this.form.reset();
  }

  @ViewChild('result') result: ElementRef;
  render = inject(Renderer2);

  @ViewChild('mathContainer') mathContainer: ElementRef;
  @ViewChild('htmlRender') htmlRender: ElementRef;

  onSubmit() {
    katex.render(this.form.controls['katex'].value, this.mathContainer.nativeElement, {
      throwOnError: false
    });

    this.editor.setContent(this.form.controls['html'].value);

    this.htmlRender.nativeElement.innerHTML = this.editor.view.dom.innerHTML;
    // katex.render(this.form.controls['html'].getRawValue(), this.result.nativeElement, {
    //   displayMode: true,
    //   throwOnError: false,
    //   errorColor: '#cccc00',
    //   delimiters: [
    //     { left: '$$', right: '$$', display: true },
    //     { left: '\\[', right: '\\]', display: true },
    //     { left: '\\(', right: '\\)', display: false },
    //     { left: '$', right: '$', display: false }
    //   ]
    // });
  }
  //this.form.controls['html'].value
  // this.form.value.editorContent
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
