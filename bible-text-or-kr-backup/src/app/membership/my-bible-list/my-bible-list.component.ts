import { Component, inject, OnInit } from '@angular/core';
import { BibleListComponent } from "../../bible/bible-list/bible-list.component";
import { AuthService } from '@app/services/auth.service';
import { ILoginUser } from '@app/interfaces/i-login-user';

@Component({
  selector: 'app-my-bible-list',
  standalone: true,
  imports: [BibleListComponent],
  templateUrl: './my-bible-list.component.html',
  styleUrl: './my-bible-list.component.scss'
})
export class MyBibleListComponent implements OnInit {

  myInfo!: ILoginUser;
  authService = inject(AuthService);

  constructor() { }


  ngOnInit(): void {
    this.myInfo = this.authService.getUserDetail() as ILoginUser;
  }

}
