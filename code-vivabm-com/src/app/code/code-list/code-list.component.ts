import { AfterViewInit, Component, Input, signal } from '@angular/core';
import { DataListComponent } from "../../common/data-list/data-list.component";
import { CircleProgressComponent } from "../../common/circle-progress/circle-progress.component";

@Component({
  selector: 'app-code-list',
  standalone: true,
  imports: [DataListComponent, CircleProgressComponent],
  templateUrl: './code-list.component.html',
  styleUrl: './code-list.component.scss'
})
export class CodeListComponent implements AfterViewInit {
  title = '코드조각 목록';


  // @Input() speed: number = 0;
  // i: number = 0;
  // setProgress = signal<number>(0);
  // async process() {
  //   await new Promise(resolve => setTimeout(resolve, this.speed))
  //     .then(() => {
  //       if (this.i >= 101) return;
  //       this.setProgress.set(this.i++);
  //       this.process();
  //     });
  // }

  async ngAfterViewInit() {
    // await this.process();
  }
}
