import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: 'app-circle-progress',
  standalone: true,
  imports: [],
  templateUrl: './circle-progress.component.html',
  styleUrl: './circle-progress.component.scss'
})
export class CircleProgressComponent implements AfterViewInit, OnDestroy {
  public ngOnDestroy(): void {
  }
  render = inject(Renderer2);
  @ViewChild('count') count!: ElementRef;
  @ViewChild('number') number!: ElementRef;

  @Input() animationDuration: number = 50;
  private stop = false;
  private currentColor: string = "green";

  async ngAfterViewInit() {
    await this.showProgress();
  }

  async showProgress() {
    while (!this.stop) {
      await new Promise(resolve => {
        let rating = this.render.selectRootElement('.rating') as HTMLElement;
        setTimeout(resolve, this.animationDuration * 1000);
        for (let i = 1; i <= 100; i++) {

          let div = this.render.createElement('div');
          this.render.addClass(div, 'block');
          this.render.appendChild(rating, div);
          this.render.setStyle(div, 'transform', `rotate(${3.6 * i}deg)`);
          this.render.setStyle(div, 'animation-delay', `${i / this.animationDuration}s`);
          this.render.setStyle(div, 'background-color', '#ffffff');

          setTimeout(() => {
            this.render.removeChild(rating, rating.firstChild);
          }, 5000);
        }
      });

      // 다음 회전 시 색상 변경
      this.currentColor = 'red';
    }
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  stopProgress() {
    this.stop = true;
  }
}
