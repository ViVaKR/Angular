import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
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
import { AuthService } from '@app/services/auth.service';
import { BibleService } from '@app/services/bible.service';

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
export class UserListComponent implements AfterContentChecked {

  authService = inject(AuthService);
  bibleService = inject(BibleService);
  isAdmin: boolean = false;

  dataColumns = ['id', 'fullName', 'email', 'roles', 'action'];
  displayColumns = ['아이디', '필명/닉네임', '이메일', '역할', '작업'];

  data$ = this.authService.getUsers();

  dataSource!: MatTableDataSource<IUserDetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  snackBar = inject(MatSnackBar);
  cdref = inject(ChangeDetectorRef);
  delUser!: IDeleteAccountRequest;

  constructor() {
    this.cdref.detach();
  }

  ngAfterViewInit(): void {
    this.authService.getUsers().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.bibleService.isElement.next(true);
    this.authService.isAdmin().subscribe({
      next: (isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      }
    });
  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
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
              this.cdref.detectChanges();
            }
          });
        });
      },
      error: (error: HttpErrorResponse) => {
        this.cdref.detectChanges();
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
