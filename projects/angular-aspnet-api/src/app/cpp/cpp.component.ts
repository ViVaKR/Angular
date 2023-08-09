import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cpp",
  templateUrl: "./cpp.component.html",
  styleUrls: ["./cpp.component.css"],
})
export class CppComponent {
  mainTitle: string = "C / C++";

  category: number = 60;

  columns = ["id", "title"];

  display = ["번호", "제목"];
}
