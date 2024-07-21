import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
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
    CustomSlicePipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {
  authService = inject(AuthService);
  dataColumns = ['id', 'fullName', 'email', 'roles'];
  displayColumns = ['아이디', '필명/닉네임', '이메일', '역할'];

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
