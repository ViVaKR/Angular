import { VivService } from '../../services/viv.service';
import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Viv } from "src/app/models/viv";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortable, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-customer-view",
  templateUrl: "./customer-view.component.html",
  styleUrls: ["./customer-view.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ]
})
export class CustomerViewComponent implements AfterViewInit {
  @Input() mainTitle?: string;
  @Input() category?: number;

  rowsSize: number = 20;
  readOnly: boolean = true;
  dataSource!: MatTableDataSource<Viv>;

  @Input() columnsToDisplay = ["id", "title"];
  @Input() displayName = ["번호", "제목"];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
  expandedElement!: Viv | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vivService: VivService,
    private announcer: LiveAnnouncer,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.getList(this.category);
  }

  getList(category?: number) {
    if (category == null) return;

    this.vivService.getCategoryDataList(category).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Viv>(data);
        this.dataSource.paginator = this.paginator;
        this.sort?.sort({ id: "id", start: "desc" } as MatSortable);
        this.dataSource.sort = this.sort;
      }
    });
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this.announcer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.announcer.announce("Sorting cleared");
    }
  }

  csharpFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getKoName(item: string): string {
    return this.displayName[this.columnsToDisplay.indexOf(item)];
  }

  openSnackBar(
    message: string,
    action: string,
    hPosition: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: hPosition,
    });
  }
}
