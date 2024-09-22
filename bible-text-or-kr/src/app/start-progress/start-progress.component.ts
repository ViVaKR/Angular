import { AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-start-progress',
  standalone: true,
  imports: [],
  templateUrl: './start-progress.component.html',
  styleUrl: './start-progress.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class StartProgressComponent implements AfterViewInit {

  @ViewChild('rating') rating!: ElementRef<HTMLDivElement>;
  @ViewChild('block') bk!: ElementRef<HTMLDivElement>;
  @ViewChild('el') el!: ElementRef<HTMLDivElement>;

  isProgressBar: boolean = false;
  render = inject(Renderer2);

  counter!: HTMLElement;
  target!: number;

  numberCounter() {
    const value = +this.counter.innerText;
    const increment = this.target / 100;
    if (value < this.target) {
      this.counter.innerText = `${Math.ceil(value + increment)}`;
      setTimeout(() => {
        this.numberCounter();
      }, 25);
    }
  }

  ngAfterViewInit(): void {

    const blocks = document.getElementsByClassName('block');

    for (let i = 1; i < 100; i++) {
      this.rating.nativeElement.innerHTML += `<div class="block"></div>`;
      this.render.setStyle(blocks[i], 'transform', `rotate(${3.6 * i}deg)`);
      this.render.setStyle(blocks[i], 'animationDelay', `${i / 40}s`);
    }

    this.counter = document.querySelector('.counter') as HTMLElement;
    this.counter.innerText = '0';
    this.target = +this.counter.getAttribute('data-target')! as number;

    this.numberCounter();
  }

}
