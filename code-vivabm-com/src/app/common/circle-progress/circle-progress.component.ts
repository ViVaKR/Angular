import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  standalone: true,
  imports: [],
  templateUrl: './circle-progress.component.html',
  styleUrl: './circle-progress.component.scss'
})
export class CircleProgressComponent implements OnInit, AfterViewInit {

  render = inject(Renderer2);

  @ViewChild('count') count!: ElementRef;
  @ViewChild('number') number!: ElementRef;

  @Input() progress!: number;
  @Input() animationDuration: number = 150;

  async ngAfterViewInit() {
    await this.showProgress();
  }

  ngOnInit(): void { }

  constructor() { }

  async showProgress() {
    await new Promise(resolve => {
      let rating = this.render.selectRootElement('.rating') as HTMLElement;

      for (let i = 1; i <= 100; i++) {
        let div = this.render.createElement('div');
        this.render.addClass(div, 'block');
        this.render.appendChild(rating, div);
        this.render.setStyle(div, 'transform', `rotate(${3.6 * i}deg)`);
        this.render.setStyle(div, 'animation-delay', `${i / this.animationDuration}s`);
      }
    });
  }
}
