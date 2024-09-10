import { Component } from '@angular/core';
import { CampService } from '@app/services/camp.service';

@Component({
  selector: 'app-b-camp',
  standalone: true,
  imports: [],
  templateUrl: './b-camp.component.html',
  styleUrl: './b-camp.component.scss'
})
export class BCampComponent {

  observable: number = 0;
  subject: number = 0;
  constructor(private campService: CampService) { }

  ngOnInit() {
    this.campService.observable.subscribe(value => this.observable = value);
    this.campService.subject.subscribe(x => this.subject = x);
  }

}
