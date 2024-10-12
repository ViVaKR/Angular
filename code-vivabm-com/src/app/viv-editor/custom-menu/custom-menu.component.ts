import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { setBlockType } from 'prosemirror-commands';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';


@Component({
  selector: 'app-custom-menu',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './custom-menu.component.html',
  styleUrl: './custom-menu.component.scss'
})
export class CustomMenuComponent implements OnInit {

  @Input() editor!: Editor;
  isActive = false;
  isDisabled = false;

  onClick(e: MouseEvent) {
    e.preventDefault();
    const { state, dispatch } = this.editor.view;
    this.execute(state, dispatch);
  }
  execute(state: EditorState, dispatch: (tr: Transaction) => void): boolean {
    const { schema } = state;

    if (this.isActive)
      return setBlockType(schema.nodes['paragraph'])(state, dispatch);
    return setBlockType(schema.nodes['code_mirror'], { level: 1 })(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes['code_mirror']);
    this.isDisabled = !this.execute(state, null);
  }

  ngOnInit(): void {
    this.editor.update.subscribe(((view) => this.update(view)));
  }

}
