import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { UserDetail } from '../../interfaces/user-detail';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, AfterViewInit {

  authService = inject(AuthService);

  isAdmin: boolean = false;
  dataColumns = ['id', 'name', 'email', 'role', 'actions'];
  displayedColumns = ['아이디', '이름', '이메일', '역할', '작업'];
  users!: UserDetail[]

  constructor() { }

  ngAfterViewInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
  }


}
