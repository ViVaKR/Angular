import { Component, inject, NgModule } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import localeKo from '@angular/common/locales/ko';
import { TextareaAutoresizeDirective } from '@app/common/textarea-autoresize.directive';

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
    AllMatModule,
    TextareaAutoresizeDirective
  ],
  providers: [
    { provide: 'LOCALE_ID', useValue: 'ko-KR' }
  ]
})

export class DashBoardComponent {

  title = "DashBoard";

}
