// buddhist-events.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { Paths } from '@app/data/menu-data';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-buddhist-events',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    TranslateModule
  ],
  providers: [],
  templateUrl: './buddhist-events.html',
  styleUrl: './buddhist-events.scss',
})
export class BuddhistEvents {

  title = Paths.BuddhistEvents.title;
  private translate = inject(TranslateService);

  today = new Date();

  showConfirm(): void {
    // get() -> Obsevable, 언어 변경에 반응
    this.translate.get('COMMON.BUTTON.SUBMIT').subscribe(text => {
      console.log(text); // "제출"
    });

    // instant() -> 즉시 값 (번역 파일 로드 완료 후에만 사용)
    const label = this.translate.instant('COMMON.BUTTON.SUBMIT');
    alert(label);
  }

  setLang(lang: 'ko' | 'en'): void {
    this.translate.use(lang);   // ← 이것만으로 전체 앱 즉시 반영
  }
}
