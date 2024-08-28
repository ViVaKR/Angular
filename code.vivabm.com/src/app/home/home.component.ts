import { Component, inject, OnInit } from '@angular/core';
import { CodeService } from '@app/services/code.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  myIp: string = '';
  codeService = inject(CodeService);
  constructor() { }

  ngOnInit(): void {
    this.codeService.getPublicIp().subscribe((response) => {
      this.myIp = response.data;
    });
  }
}
