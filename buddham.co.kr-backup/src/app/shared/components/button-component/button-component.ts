import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  @Input() color: 'black' | 'blue' | 'white' = 'black';

  value = input(0);

  get buttonClasses(): string {
    const colors = {
      black: "bg-black text-white",
      blue: "bg-blue-500 text-white",
      white: "bg-white text-black",
    };
    return `${colors[this.color]} rounded-full px-4 my-2 py-1.5 font-sans text-sm/6 font-medium shadow`;
  }
}
