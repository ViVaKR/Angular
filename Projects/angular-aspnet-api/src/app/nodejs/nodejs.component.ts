import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nodejs',
  templateUrl: './nodejs.component.html',
  styleUrls: ['./nodejs.component.css']
})
export class NodejsComponent {

mainTitle: string = "node.js";

category: number = 22;

columns = ["id", "title"];

display = ["번호", "제목"];
}
