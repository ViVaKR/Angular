import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import localeKo from '@angular/common/locales/ko';

registerLocaleData(localeKo, 'ko');

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    JsonPipe,
    NgIf,
    NgFor,
    CurrencyPipe,
    AllMatModule
  ],
  providers: [
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }
  ]
})

export class DashBoardComponent {

  title = "오늘의 경전";

  private breakpointObserver = inject(BreakpointObserver);
  today = new Date();
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '경전 1', cols: 1, rows: 1 },
          { title: '경전 2', cols: 1, rows: 1 },
          { title: '경전 3', cols: 1, rows: 1 },
          { title: '경전 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: '경전 1', cols: 2, rows: 1 },
        { title: '경전 2', cols: 1, rows: 1 },
        { title: '경전 3', cols: 1, rows: 2 },
        { title: '경전 4', cols: 1, rows: 1 }
      ];
    })
  );
}
