import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IDeleteAccountRequest } from '@app/interfaces/i-delete-account-request';
import { IUserDetail } from '@app/interfaces/i-user-detail';
import { CustomSlicePipe } from '@app/pipes/custom-slice.pipe';
import { ActionService } from '@app/services/action.service';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AsyncPipe,
    NgIf,
    NgFor,
    JsonPipe,
    CustomSlicePipe,
    MatIconModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  authService = inject(AuthService);
  codeService = inject(CodeService);
  actionService = inject(ActionService);
  snackBar = inject(MatSnackBar);

  delUser!: IDeleteAccountRequest;
  isAdmin: boolean = false;

  dataColumns = ['id', 'fullName', 'email', 'roles', 'action'];
  displayColumns = ['아이디', '필명/닉네임', '이메일', '역할', '작업'];

  data$ = this.authService.getUsers();
  // , 'email', 'roles'
  dataSource!: MatTableDataSource<IUserDetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.authService.getUsers().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.actionService.nextLoading(false);
    },
      error => {
        this.actionService.nextLoading(false);
        this.snackBar.open(error.error.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  ngOnInit(): void {
    this.codeService.isElement.next(true);
    this.authService.isAdmin().subscribe({
      next: (isAdmin: boolean) => this.isAdmin = isAdmin
    });
  }

  deleteUser(email: string): void {

    this.delUser = {
      email: email,
      password: '-'
    };

    this.authService.deleteUser(this.delUser).subscribe({
      next: (response) => {
        let ref = this.snackBar.open(response.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        ref.afterDismissed().subscribe(() => {
          this.authService.getUsers().subscribe({
            next: (data) => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
