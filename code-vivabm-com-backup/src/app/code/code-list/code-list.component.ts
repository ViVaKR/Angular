import { Component } from '@angular/core';
import { DataListComponent } from "../../common/data-list/data-list.component";

@Component({
  selector: 'app-code-list',
  standalone: true,
  imports: [DataListComponent],
  templateUrl: './code-list.component.html',
  styleUrl: './code-list.component.scss'
})
export class CodeListComponent {

  title = '코드 목록';
}
