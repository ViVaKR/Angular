import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/models/user-dto';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserViewComponent implements AfterViewInit
{
  @Input() mainTitle?: string;

  dataSource!: MatTableDataSource<UserDTO>;
  displayedColumns = ['fullName', 'email', 'userName'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private announcer: LiveAnnouncer)
  { }

  ngAfterViewInit()
  {
    this.getAllUser();
  }
  // User List
  getAllUser()
  {
    this.userService.getAllUser().subscribe({
      next: data =>
      {
        this.dataSource = new MatTableDataSource<UserDTO>(data);
        this.dataSource.paginator = this.paginator; // 꼭 소스 바인딩과 함께 초기화
        this.dataSource.sort = this.sort;
      },
      error: err => console.log(err)
    });
  }

  sortChange(sortState: Sort)
  {
    if (sortState.direction)
    {
      this.announcer.announce(`Sorted ${sortState.direction}ending`);
    } else
    {
      this.announcer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
  }
}
