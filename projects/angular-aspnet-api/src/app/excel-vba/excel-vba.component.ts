import { Component } from '@angular/core';

@Component({
  selector: 'app-excel-vba',
  templateUrl: './excel-vba.component.html',
  styleUrls: ['./excel-vba.component.css']
})
export class ExcelVbaComponent {
	mainTitle: string = "Excel VBA";

	category: number = 100;

	columns = ["id", "title"];

	display = ["번호", "제목"];
}
