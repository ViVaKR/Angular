import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { ReadyPage } from "@app/shared/ready-page/ready-page";

@Component({
  selector: 'app-home-scripture',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    ReadyPage
  ],
  templateUrl: './home-scripture.html',
  styleUrl: './home-scripture.scss',
})
export class HomeScripture {
  title = Paths.HomeScripture.title;
}
