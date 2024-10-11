import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-git-camp',
  standalone: true,
  imports: [],
  templateUrl: './git-camp.component.html',
  styleUrl: './git-camp.component.scss'
})
export class GitCampComponent {
  @Input() title: any = 'Git Camp';
}
