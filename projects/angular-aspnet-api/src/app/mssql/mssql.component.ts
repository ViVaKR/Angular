import { Component } from '@angular/core';

@Component({
  selector: "app-mssql",
  templateUrl: "./mssql.component.html",
  styleUrls: ["./mssql.component.css"],
})
export class MssqlComponent {
  mainTitle: string = "MSSQL";

  category: number = 30;

  columns = ["id", "title"];

  display = ["번호", "제목"];
}
