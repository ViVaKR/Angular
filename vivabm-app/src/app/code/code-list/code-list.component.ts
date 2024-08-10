import { Component, inject, OnInit } from '@angular/core';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { Observable } from 'rxjs';
import { DataListComponent } from "../../common/data-list/data-list.component";

@Component({
  selector: 'app-code-list',
  standalone: true,
  imports: [DataListComponent],
  templateUrl: './code-list.component.html',
  styleUrl: './code-list.component.scss'
})
export class CodeListComponent implements OnInit {

  title = 'Code List';

  codeService = inject(CodeService);

  codes$!: Observable<ICode[]>;

  ngOnInit(): void {
    this.codes$ = this.codeService.getCodes();
  }
}
