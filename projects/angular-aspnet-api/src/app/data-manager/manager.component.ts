import { UserService } from 'src/app/services/user.service';
import { VivService } from "../services/viv.service";
import { ErrorMatcherComponent } from "../commons/error-matcher/error-matcher.component";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
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
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogVivComponent } from "src/app/commons/dialog-viv/dialog-viv.component";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { DialogDeleteComponent } from "src/app/commons/dialog-delete.component";
import { ITypes } from "src/app/models/itypes";
import { environment } from "src/environments/environment";
import { MatAccordion } from "@angular/material/expansion";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ManagerComponent implements AfterViewInit {
  public env = environment;
  mainTitle: string = "Manager";

  matcher = new ErrorMatcherComponent();

  hide: boolean = false;
  rowsSize: number = 60;
  pageSize: number = 10;
  readOnly: boolean = true;

  typeOfProg: ITypes[] = [
    { value: ".NET Core & Framework", category: 10 },
    { value: "ASP.NET Core", category: 11 },
    { value: "Angular", category: 20 },
    { value: "React", category: 21 },
    { value: "Node.js", category: 22 },
    { value: "MSSQL", category: 30 },
    { value: "MySQL", category: 31 },
    { value: "Oracle", category: 32 },
    { value: "PostgreSQL", category: 33 },
    { value: "Rust", category: 40},
    { value: "Python", category: 50},
    { value: "C / C++", category: 60},
	{ value: "Excel VBA", category: 100}
  ];

  dataSource!: MatTableDataSource<Viv>;

  columnsToDisplay = ["id", "title"];
  displayName = ["번호", "제목"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
  expandedElement!: Viv | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  formGroup!: FormGroup;

  constructor(
    private vivService: VivService,
    public userService: UserService,
    private fb: FormBuilder,
    private announcer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {
    this.formInitialize();
  }

  ngAfterViewInit(): void {
    this.vivService.getAll().subscribe({
      next: (data) => {
        this.bindTable(data);
        this.sort?.sort({ id: "id", start: "desc" } as MatSortable);
        this.dataSource.sort = this.sort;
      },
    });
  }

  private bindTable(data: Viv[]) {
    this.dataSource = new MatTableDataSource<Viv>(data);
    this.paginator.pageSize = this.pageSize;
    this.dataSource.paginator = this.paginator;
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this.announcer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.announcer.announce("Sorting cleared");
    }
  }

  // 폼초기화
  formInitialize() {
    this.formGroup = this.fb.group({
      id: [""],
      title: ["", [Validators.required]],
      contents: ["", [Validators.required]],
      note: ["", [Validators.required]],
      category: ["", [Validators.required]],
    });
  }

  csharpFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // 컬럼 한글명;
  getKoName(item: string): string {
    return this.displayName[this.columnsToDisplay.indexOf(item)];
  }
  isEditMode: boolean = false;
  startEdit(element: Viv, $target: HTMLElement) {
    this.formGroup.setValue({
      id: element.id,
      title: element.title,
      contents: element.contents,
      note: element.note,
      category: element.category,
    });

    this.isEditMode = true;

    this.accordion.openAll();
    setTimeout(() => {
      $target.scrollIntoView();
    }, 1000);
  }

  scrollToTarget(target: HTMLElement) {
    this.isEditMode = false;
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    this.formGroup.get("id")?.setValue(0);

    let category = this.formGroup.get("category")?.value;

    if (category === null) console.log("category is null");

    this.vivService.postData(this.formGroup.value).subscribe({
      next: (data) => {
        this.dataSource.data.push(data);
        this.bindTable(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.openDialog(data, true, "추가작업 완료");
      },
      error: (err) => this.openDialog(err, false, "추가작업 실패"),
      complete: () => {
        this.formInitialize();
      },
    });
  }

  putData(id: number) {
    
    this.vivService.putData(id, this.formGroup.value).subscribe({
      next: (data) => {
        let index = this.dataSource.data.findIndex((x) => x.id === data.id);
        this.dataSource.data[index] = data;
        this.bindTable(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.openDialog(data, true, "수정 작업완료");
      },
      error: (err) => this.openDialog(err, false, "수정 작업실패"),
    });
  }

  deleteData(id: number) {
    this.openDialogCheck(id);
  }

  openDialog(data: any, success: boolean, action: string) {
    let message = `자료번호 ( ${data.id} ) 데이터 ${action} `;

    let dialogRef = success
      ? this._dialog.open(DialogVivComponent, { data: { name: `${message}` } })
      : this._dialog.open(DialogVivComponent, { data: { name: `${message}` } });

    dialogRef.afterClosed().subscribe(() => {
      this.reloadComponent();
    });
  }

  openDialogCheck(id: number): void {
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      data: { name: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.vivService.deleteData(id).subscribe({
          next: (data) => {
            const index: number = this.dataSource.data.findIndex(
              (x) => x.id == data.id
            );

            if (index !== -1) {
              this.dataSource.data.splice(index, 1);
              this.bindTable(this.dataSource.data);
              this.dataSource.sort = this.sort;
            }
            this.openDialog(data, true, "삭제작업 완료");
          },
          error: (err) => this.openDialog(err, false, "삭제작업 실패"),
        });
      }
    });
  }

  reloadComponent() {
    this.scrollToTop();
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
