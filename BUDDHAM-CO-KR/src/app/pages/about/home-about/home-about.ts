import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { ReadyPage } from "@app/shared/ready-page/ready-page";

@Component({
  selector: 'app-home-about',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    ReadyPage
  ],
  templateUrl: './home-about.html',
  styleUrl: './home-about.scss',
})
export class HomeAbout {
  title = Paths.HomeAbout.title;
}
