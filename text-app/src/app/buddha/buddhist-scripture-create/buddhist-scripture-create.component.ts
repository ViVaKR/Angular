import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HangulOrderArray } from '@app/types/hangul-order';
import { Utility } from '@app/util/utility';
import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
export class BuddhistScriptureCreateComponent implements OnInit, OnDestroy {

  hangulArray = HangulOrderArray;
  private fb = inject(FormBuilder);
  createSutraForm!: FormGroup;
  public v: number = 0;

  // 구독
  sutraSubscription!: Subscription;


  constructor(private service: BuddhaService, public utility: Utility, private snackBar: MatSnackBar) {
    this.utility.value.subscribe((value: number) => { this.v = value ?? 0; });
  }

  ngOnInit(): void {
    this.v = 0;
    this.newForm("-");
  }

  newForm(val: string): void {

    this.createSutraForm = this.fb.group({
      id: 0, // 글번호 (PK)
      title: [val, Validators.required], // 제목
      hangulOrder: [0, Validators.required], // 한글순서
      subtitle: [val], // 부제
      author: [val], // 저자
      translator: [val], // 번역자
      summary: [val], // 요약
      sutra: [val, Validators.required], // 경전
      originalText: [val], // 원문
      annotation: [val], // 주석
    });
  }

  onSubmit(): void {

    this.sutraSubscription = this.service.addScripture(this.createSutraForm.value)
      .subscribe((data: BuddistScripture) => {
        this.openSnackBar(`Scripture created ( ${data.id} ) successfully`, 'Create Success!');
        this.newForm("-");
      }, (error: any) => {
        console.log(error);
      }
      );
  }

  // clear(form: FormGroup): void {
  //   form.reset();
  //   Object.keys(form.controls).forEach(key => {
  //     form.controls[key].setErrors(null)
  //   });
  // }

  onReset(): void {
    this.createSutraForm.reset();
  }


  onCancel(): void {
    this.createSutraForm.reset();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }

  // 구독 해제
  ngOnDestroy(): void {
    if (this.sutraSubscription) {
      this.sutraSubscription.unsubscribe();
    }
  }
}
