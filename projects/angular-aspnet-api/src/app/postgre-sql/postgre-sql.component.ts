import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-postgre-sql",
  templateUrl: "./postgre-sql.component.html",
  styleUrls: ["./postgre-sql.component.css"],
})
export class PostgreSQLComponent {
  mainTitle: string = "PostgreSQL";

  category: number = 33;

  columns = ["id", "title"];

  display = ["번호", "제목"];
}
