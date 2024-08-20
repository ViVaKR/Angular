import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { Observable, of } from 'rxjs';
import { DataListComponent } from "../../common/data-list/data-list.component";

@Component({
  selector: 'app-code-list',
  standalone: true,
  imports: [DataListComponent],
  templateUrl: './code-list.component.html',
  styleUrl: './code-list.component.scss'
})
export class CodeListComponent implements OnInit, AfterViewInit {

  title = '코드 목록';

  codeService = inject(CodeService);

  codes$!: Observable<ICode[]>;

  // test$ = of(1, 2, 3, 4, 5);

  ngOnInit(): void {
    this.codes$ = this.codeService.getCodes();
  }

  ngAfterViewInit(): void {
    // Demo Code
    // this.test$.subscribe({
    //   next: (value) => console.log(value),
    //   error: (error) => console.error(error),
    //   complete: () => console.log('Completed')
    // })
  }
}
