import { Component, computed, input, output } from '@angular/core';
import { ITangwhaSchema } from '@app/core/interfaces/tangwha/i-tangwha';

@Component({
  selector: 'app-tangwha-card',
  imports: [],
  templateUrl: './tangwha-card.html',
  styleUrl: './tangwha-card.scss',
})
export class TangwhaCard {

  item = input.required<ITangwhaSchema>();
  selected = output<ITangwhaSchema>();

  readonly tierLabel = computed(() => {
    const map: Record<number, string> = {
      1: '국보',
      2: '보물',
      3: '일반'
    }

    return map[this.item().tier] ?? '';
  });

  readonly tierClass = computed(() => {
    return `tier${this.item().tier}`;
  })
}
