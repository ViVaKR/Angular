
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation, isDevMode } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


import { Validators, Editor, Toolbar, DEFAULT_TOOLBAR, NgxEditorModule, toHTML, toDoc } from 'ngx-editor';
import jsonDoc from './doc';
import schema from './schema';
import { Plugin, PluginKey } from 'prosemirror-state';
// import { schema } from 'ngx-editor/schema'
import nodeViews from './nodeviews';
import { CustomMenuComponent } from './custom-menu/custom-menu.component';


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
  ],
  templateUrl: './viv-editor.component.html',
  styleUrl: './viv-editor.component.scss'
})
export class VivEditorComponent implements OnInit, OnDestroy {
  isDevMode = isDevMode();

  editordoc = jsonDoc;

  editor: Editor;
  contenet: string = 'Hello, World!';
  toolbar: Toolbar = DEFAULT_TOOLBAR;

  form = new FormGroup({
    // editorContent: new FormControl({ value: jsonDoc, disabled: false }, Validators.required(schema)),
    editorContent: new FormControl({ value: jsonDoc, disabled: false }, Validators.required(schema))
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  html: string = '';
  js: any = '';
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

    this.html = toHTML(this.editordoc, schema);
    this.js = toDoc(this.html, schema);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
