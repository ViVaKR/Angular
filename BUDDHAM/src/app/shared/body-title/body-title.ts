import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MATERIAL_COMMON } from '../imports/material-imports';

@Component({
  selector: 'body-title',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './body-title.html',
  styleUrl: './body-title.scss',
})
export class BodyTitle {
  title = input<string>('🪷');
  icon = input<string>('library_books');
}
