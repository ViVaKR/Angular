import { Component } from "@angular/core";

@Component({
  selector: "app-oracle",
  templateUrl: "./oracle.component.html",
  styleUrls: ["./oracle.component.css"],
})
export class OracleComponent {
  mainTitle: string = "Oracle";

  category: number = 32;

  columns = ["id", "title"];

  display = ["번호", "제목"];
}
