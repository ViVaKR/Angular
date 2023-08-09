import { Component} from '@angular/core';

@Component({
  selector: 'app-dotnet-core-framework',
  templateUrl: './dotnet-core-framework.component.html',
  styleUrls: ['./dotnet-core-framework.component.css']
})
export class DotnetCoreFrameworkComponent {

mainTitle: string = ".NET Core & Framework";

category:number = 10;

columns = ["id", "title", "typeOfProgram"];

display = ["번호", "제목", "카테고리"];
}
