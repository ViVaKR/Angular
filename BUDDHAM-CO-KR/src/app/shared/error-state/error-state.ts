import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { MATERIAL_COMMON } from '../imports/material-imports';
import { Router } from '@angular/router';

@Component({
  selector: 'error-state',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './error-state.html',
  styleUrl: './error-state.scss',
})
export class ErrorState {

  private router = inject(Router);

  public retry = output<void>();

  onRetry() {
    this.retry.emit();
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([this.router.url]));
  }
}
