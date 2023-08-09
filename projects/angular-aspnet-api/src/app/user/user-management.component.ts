import { IRegister } from './../models/i-register';
import { UserDataComponent } from "./user-data/user-data.component";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../environments/environment.prod";
import {
  AfterViewInit,
  Component,
  ViewChild,
} from "@angular/core";
import { UserDTO } from "src/app/models/user-dto";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements AfterViewInit {
  mainTitle: string = "Members";

  dataSource!: MatTableDataSource<UserDTO>;

  displayedColumns: string[] = [
    "fullName",
    "email",
    "userName",
    "dateCreated",
    "role",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public userService: UserService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<UserDTO>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserData(data: IRegister) {
    
    const dialogRef = this.dialog.open(UserDataComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Result: ${result}`);
    });
  }
}
