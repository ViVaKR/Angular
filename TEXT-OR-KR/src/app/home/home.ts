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

  // IIpInfo 전체를 Observable 로 받는다.
  ipInfo$!: Observable<IIpInfo | null>;

  constructor() { }

  ngOnInit() {
    // 서비스에서 캐싱된 IP 정보를 가져오는 Observale 을 할당
    // 이 시점에서 HTTP 요청은 이미 서비스 초기화 시 한 번 발생했거나,
    // 아직 발생하지 않았다면 이 구독 시점에서 shreReplay 에 의해 트리거될 것.
    this.ipInfo$ = this.ipService.getIpInfo();

    console.log(this.ipInfo$)
  }
}
