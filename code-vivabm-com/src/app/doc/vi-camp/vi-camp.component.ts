import { Component, Input } from '@angular/core';


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
  imports: [],
  templateUrl: './vi-camp.component.html',
  styleUrl: './vi-camp.component.scss'
})
export class ViCampComponent {
  @Input() title: any = 'Vim Camp';
}
