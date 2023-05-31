import { Component } from '@angular/core';

@Component({
  selector: 'app-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.css']
})
export class MysqlComponent {

mainTitle: string = "MySQL";

category: number = 31;

columns = ["id", "title"];

display = ["번호", "제목"];
}
