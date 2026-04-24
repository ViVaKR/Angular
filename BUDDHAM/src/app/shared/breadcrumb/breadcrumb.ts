import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MATERIAL_COMMON } from '../imports/material-imports';
import { BreadcrumbService } from '@app/core/services/breadcrumb-service';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  readonly service = inject(BreadcrumbService);
}
