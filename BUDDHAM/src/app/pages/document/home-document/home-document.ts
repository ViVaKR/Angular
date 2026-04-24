import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { ReadyPage } from "@app/shared/ready-page/ready-page";

@Component({
  selector: 'app-home-document',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './home-document.html',
  styleUrl: './home-document.scss',
})
export class HomeDocument {
  title = Paths.HomeDocument.title;
}
