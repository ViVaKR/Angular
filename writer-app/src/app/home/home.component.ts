import { Component, inject, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {



  ngOnInit(): void {
    this.getMyPublicIp();
  }
  utilityService = inject(UtilityService);

  myPublicIp = '';

  getMyPublicIp = () => {
    this.utilityService.getMyPublicIp().subscribe({
      next: (ip) => {
        this.myPublicIp = ip;
      },
      error: (err) => {
        this.myPublicIp = err.error.message;
      }
    });
  }
}
