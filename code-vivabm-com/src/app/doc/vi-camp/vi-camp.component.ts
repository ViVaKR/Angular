import { Component, Input } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";


interface FileStats {
  bytes: number;
  imports: { path: string; kind: string; original: string }[];
  format: string;
}

interface Stats {
  [key: string]: FileStats;
}


@Component({
  selector: 'app-vi-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './vi-camp.component.html',
  styleUrl: './vi-camp.component.scss'
})
export class ViCampComponent {
  @Input() title: any = 'Vim Camp';
  @Input() message: any = 'Vim 훈련소 준비중입니다.';
}
