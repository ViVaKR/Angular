import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CodeService } from '@app/services/code.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  http = inject(HttpClient);
  codeService = inject(CodeService);
  ipAddress: string = '0.0.0.0';

  ngOnInit() {
    this.codeService.isElement.next(false);

    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        this.ipAddress = data.ip;
        this.codeService.nextPublicIPAddress(this.ipAddress);
      })
      .catch(_ => {
        this.ipAddress = '0.0.0.0';
        this.codeService.nextPublicIPAddress(this.ipAddress);
      });
  }
}
