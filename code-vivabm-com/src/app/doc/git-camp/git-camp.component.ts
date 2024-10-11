import { Component, Input } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-git-camp',
  standalone: true,
  imports: [PreparingComponent],
  templateUrl: './git-camp.component.html',
  styleUrl: './git-camp.component.scss'
})
export class GitCampComponent {
  @Input() title: any = 'Git Camp';
  @Input() message: any = '준비중입니다.';
}
