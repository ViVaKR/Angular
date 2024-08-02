import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { UserDetail } from '@app/interfaces/user-detail';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MessageService } from '@app/services/error.service';
import { DeleteAccountRequest } from '@app/interfaces/delete-account-request';
import { CustomSlicePipe } from '@app/pipes/custom-slice.pipe';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    JsonPipe,
    AsyncPipe,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    CustomSlicePipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, AfterViewInit {

  authService = inject(AuthService);
  messageService = inject(MessageService)

  isAdmin: boolean = false;
  dataColumns = ['id', 'fullName', 'email', 'roles', 'action'];
  displayedColumns = ['아이디', '이름', '이메일', '역할', '작업'];

  dataSource!: MatTableDataSource<UserDetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.authService.getUserList().subscribe({
      next: (data: UserDetail[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.messageService.openSnackBar('전체 사용자 목록을 불러왔습니다.', '닫기');
      },
      error: (error: any) => this.messageService.openSnackBar(error.error.message, '닫기')
    });
  }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe({
      next: (data: boolean) => this.isAdmin = data,
      error: (error: any) => this.messageService.openSnackBar(error.error.message, '닫기')
    });
  }

  deleteUser(email: string): void {
    const delUser: DeleteAccountRequest = {
      email: email,
      password: '-'
    }

    this.authService.deleteUser(delUser).subscribe({
      next: (data: any) => {
        let ref = this.messageService.openSnackBar(data.message, '닫기');
        ref.afterDismissed().subscribe(() => {
          this.authService.getUserList().subscribe({
            next: (data) => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });
        });
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.openSnackBar(error.error.message, '닫기');
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
