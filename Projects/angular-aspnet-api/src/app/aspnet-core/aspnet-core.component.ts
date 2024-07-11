import { Component } from "@angular/core";

@Component({
  selector: "app-aspnet-core",
  templateUrl: "./aspnet-core.component.html",
  styleUrls: ["./aspnet-core.component.css"],
})
export class AspnetCoreComponent {
  mainTitle: string = "ASP.NET Core Web Application";

  category: number = 11;
  
  columns = ["id", "title", "typeOfProgram"];

  display = ["번호", "제목", "카테고리"];
}
