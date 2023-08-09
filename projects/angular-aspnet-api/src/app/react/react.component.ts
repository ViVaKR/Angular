import { Component } from '@angular/core';

@Component({
  selector: 'app-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.css']
})
export class ReactComponent {

mainTitle: string = "React";

category: number = 21;

columns = ["id", "title"];

display = ["번호", "제목"];
}
