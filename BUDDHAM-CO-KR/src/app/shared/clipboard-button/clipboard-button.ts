import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClipboardButtonComponent as NgxClipboardButton } from 'ngx-markdown';
import { MATERIAL_COMMON } from '../imports/material-imports';

@Component({
  selector: 'clipboard-button',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './clipboard-button.html',
  styleUrl: './clipboard-button.scss',
})
export class ClipboardButton extends NgxClipboardButton { }
