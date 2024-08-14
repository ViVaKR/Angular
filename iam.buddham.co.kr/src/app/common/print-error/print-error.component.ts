import { Component, Input } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-print-error',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './print-error.component.html',
  styleUrl: './print-error.component.scss'
})
export class PrintErrorComponent {
  @Input("control") control: any;

}
