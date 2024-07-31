import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteAccountRequest } from '@app/interfaces/delete-account-request';
import { UserDetail } from '@app/interfaces/user-detail';
import { CustomSlicePipe } from '@app/pipes/custom-slice.pipe';
import { TableDataSource } from '@app/schematics/table/table-datasource';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-users',
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
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {

  authService = inject(AuthService);
  isAdmin: boolean = false;

  dataColumns = ['id', 'fullName', 'email', 'roles', 'action'];
  displayColumns = ['아이디', '필명/닉네임', '이메일', '역할', '작업'];

  data$ = this.authService.getUsers();
  // , 'email', 'roles'
  dataSource!: MatTableDataSource<UserDetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.authService.getUsers().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe({
      next: (isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      }
    });
  }

  snackBar = inject(MatSnackBar);

  delUser!: DeleteAccountRequest;

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


// Name, Email, Role

/*
tbody

@for(item of user$ | async; track item.id)


<td> item.roles.join(', ') || '-'</td>
*/
