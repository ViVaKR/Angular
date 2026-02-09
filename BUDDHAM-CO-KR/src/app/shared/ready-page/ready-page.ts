import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'app-ready-page',
  imports: [],
  templateUrl: './ready-page.html',
  styleUrl: './ready-page.scss',
  host: {
    '[style.--bg-image]': 'backgroundUrl()'
  }
})
export class ReadyPage {
  background = input<string>('boy-1');
  backgroundUrl = computed(() =>
    `url('/assets/images/${this.background()}.webp')`
  );

  constructor() {
    effect(() => {
      const img = new Image();
      img.src = this.backgroundUrl();
    })
  }
}
