import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CodeService } from '@app/services/code.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: []
  ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  http = inject(HttpClient);
  codeService = inject(CodeService);

  ipAddress: string = '0.0.0.0';

  ngOnInit() {
    this.codeService.isElement.next(false);
    this.codeService.publicIPAddress.subscribe((ip: string) => this.ipAddress = ip);
    this.codeService.isElement.next(false);
  }
}
