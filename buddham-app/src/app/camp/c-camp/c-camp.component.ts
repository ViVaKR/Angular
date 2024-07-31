import { Component, OnInit } from '@angular/core';
import { CampService } from '@app/services/camp.service';

@Component({
  selector: 'app-c-camp',
  standalone: true,
  imports: [],
  templateUrl: './c-camp.component.html',
  styleUrl: './c-camp.component.scss'
})
export class CCampComponent implements OnInit {

  observable: number = 0;
  subject: number = 0;
  constructor(private campService: CampService) { }

  ngOnInit() {
    this.campService.observable.subscribe(value => this.observable = value);
    this.campService.subject.subscribe(x => this.subject = x);
  }

}
