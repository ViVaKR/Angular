import { Component, inject, OnInit } from '@angular/core';
import { IResponse } from '@app/interfaces/i-response';
import { CodeService } from '@app/services/code.service';
import { GlobalService } from '@app/services/global.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  myIp: string = '';
  globalService = inject(GlobalService);
  codeService = inject(CodeService);

  constructor() {

  }

  ngOnInit(): void {
    this.codeService.getPublicIp().subscribe((response) => {
      this.myIp = response.data;
      this.globalService.ip.next(this.myIp);
    });
  }
}
