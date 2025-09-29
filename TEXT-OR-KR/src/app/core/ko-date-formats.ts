import {MatDateFormats} from '@angular/material/core';

export const KO_DATE_FORMATS: MatDateFormats = {

  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD', // 입력 필드에 표시될 형식
    monthYearLabel: 'YYYY년 MM월', // 달력 헤더에 표시될 형식
    dateA11yLabel: 'LL', // 접근성 레이블
    monthYearA11yLabel: 'YYYY년 MMMM', // 접근성을 위한 윌/년 레이블
  }
}
