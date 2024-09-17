import { Component, OnInit } from '@angular/core';
import { CampService } from '@app/services/camp.service';

@Component({
  selector: 'app-a-camp',
  standalone: true,
  imports: [],
  templateUrl: './a-camp.component.html',
  styleUrl: './a-camp.component.scss'
})
export class ACampComponent implements OnInit {

  random: number = 0;

  multiCast: number = 0;

  constructor(private campService: CampService) { }

  ngOnInit() {
    this.campService.observable.subscribe(value => this.random = value);
    this.campService.subject.subscribe(x => this.multiCast = x);
  }
}
