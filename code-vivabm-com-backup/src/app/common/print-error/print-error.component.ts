import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-print-error',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './print-error.component.html',
  styleUrl: './print-error.component.scss'
})
export class PrintErrorComponent {
  @Input("control") control: any;
}
