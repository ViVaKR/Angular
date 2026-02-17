import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

@Component({
  selector: 'app-home-scripture',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
  ],
  templateUrl: './home-scripture.html',
  styleUrl: './home-scripture.scss',
})
export class HomeScripture {
  title = Paths.HomeScripture.title;
}
