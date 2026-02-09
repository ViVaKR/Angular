import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { ListTable } from "../list-table/list-table";

@Component({
  selector: 'body-layout',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
  ],
  templateUrl: './body-layout.html',
  styleUrl: './body-layout.scss',
})
export class BodyLayout {

}
