import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.scss'
})
export class MyInfoComponent implements OnInit, AfterViewInit {

  id = '-';
  activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.id = params['id'] ?? '?';
    });
  }
  ngAfterViewInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.id = params['id'] ?? '#';
    });
  }
}
