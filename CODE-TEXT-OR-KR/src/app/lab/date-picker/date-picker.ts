import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {KO_DATE_FORMATS} from '@app/core/ko-date-formats';

@Component({
  selector: 'app-date-picker',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './date-picker.html',
  providers: [
    // 1. 날짜 어댑터 제공
    provideNativeDateAdapter(),

    // 2. 날짜 형식 제공 (핵심) YYYY/MM/DD
    {
      provide: MAT_DATE_FORMATS,
      useValue: KO_DATE_FORMATS
    },
    {provide: MAT_DATE_LOCALE, useValue: 'ko-KR'}

  ],
  styleUrl: './date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePicker {

}
