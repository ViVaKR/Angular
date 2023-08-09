import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-python",
  templateUrl: "./python.component.html",
  styleUrls: ["./python.component.css"],
})
export class PythonComponent {
  mainTitle: string = "Python";

  category: number = 50;

  columns = ["id", "title"];

  display = ["번호", "제목"];
}
