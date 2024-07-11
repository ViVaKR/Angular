import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HangulOrderArray } from '@app/types/hangul-order';
import { Utility } from '@app/util/utility';


@Component({
  selector: 'app-buddhist-scripture-create',
  standalone: true,
  imports: [
    AllMatModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './buddhist-scripture-create.component.html',
  styleUrl: './buddhist-scripture-create.component.scss'
})
export class BuddhistScriptureCreateComponent {

  hangulArray = HangulOrderArray;
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    id: 0, // 글번호 (PK)
    title: [null, Validators.required], // 제목
    subtitle: null, // 부제
    author: null, // 저자
    translator: null, // 번역자
    summary: null, // 요약
    sutra: [null, Validators.required], // 경전
    originalText: null, // 원문
    annotation: null, // 주석
    hangulOrder: [null, Validators.required], // 한글순서
  });
  public v: number = 0;
  constructor(public utility: Utility) {
    this.utility.value.subscribe((value: number) => {
      this.v = value;
    });
  }

  onSubmit(): void {
    alert('Thanks!');
  }

}
