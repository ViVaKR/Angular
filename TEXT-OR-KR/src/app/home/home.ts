import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IIpInfo } from '@app/interfaces/i-ip-info';
import { IpService } from '@app/services/ip.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  animations: []
})
export class Home implements OnInit {

  ipService = inject(IpService);
  title = 'Home';

  message = ['인', '간', '이', '-', '이', '해', '하', '는', '-', '코', '드', '조', '각'];
  ipInfo$!: Observable<IIpInfo | null>;

  constructor() { }

  ngOnInit() {
    this.ipInfo$ = this.ipService.getIpInfo();
  }
}
