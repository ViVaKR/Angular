import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_COMMON } from '../imports/material-imports';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-markdown-renderer',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    MarkdownModule
  ],
  templateUrl: './markdown-renderer.html',
  styleUrl: './markdown-renderer.scss',
})
export class MarkdownRenderer {

}
