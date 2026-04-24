import { Component, input, output } from '@angular/core';
import { ITangwhaSchema } from '@app/core/interfaces/tangwha/i-tangwha';

@Component({
  selector: 'app-tangwha-modal',
  imports: [],
  templateUrl: './tangwha-modal.html',
  styleUrl: './tangwha-modal.scss',
})
export class TangwhaModal {
  item = input.required<ITangwhaSchema>();
  closed = output<void>();
  readonly tierMap: Record<number, string> = { 1: '국보', 2: '보물', 3: '일반' };

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      this.closed.emit();
    }
  }
}
