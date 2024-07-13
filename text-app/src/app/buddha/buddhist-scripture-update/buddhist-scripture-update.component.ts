import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HangulOrderArray } from '@app/types/hangul-order';
import { Utility } from '@app/util/utility';
import { ActivatedRoute, Params } from '@angular/router';
import { BuddhaService } from '@app/services/buddha.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { BuddistScripture } from '@app/types/buddist-scripture';
@Component({
  selector: 'app-buddhist-scripture-update',
  standalone: true,
  imports: [
    AllMatModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './buddhist-scripture-update.component.html',
  styleUrl: './buddhist-scripture-update.component.scss'
})
export class BuddhistScriptureUpdateComponent implements OnInit, OnDestroy {

  title = "Update Buddhist Scripture"; // 제목
  hangulArray = HangulOrderArray; // 한글순서 배열
  private fb = inject(FormBuilder); // Form Builder

  updateSutraForm!: FormGroup; // Form Group
  public v: number = 0;

  sutraSubscription!: Subscription;
  utilitySubscription!: Subscription;

  constructor(private route: ActivatedRoute, private service: BuddhaService,
    public utility: Utility,
    private snackBar: MatSnackBar) {

    this.utilitySubscription = this.utility.value.subscribe((value: number) => {
      this.utility.value.subscribe((value: number) => { this.v = value ?? 0; });
    });
  }

  ngOnInit(): void {

    this.newForm("-");

    this.route.queryParams.subscribe({
      next: (params: Params) => {
        const id = params['id'] as number;


        if (id === null || id === undefined) { this.updateSutraForm.controls['id'].setValue(1); }

        this.service.getScriptureById(id).subscribe({
          next: (data: any) => {
            if (data != null) {
              this.updateSutraForm.patchValue(data);
            }
          }, error: (error: any) => {
            console.error(error);
          }
        });


      }, error: (error: any) => {
        console.error(error);
      }
    });
  }
  newForm(val: string): void {
    this.updateSutraForm = this.fb.group({
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

    this.sutraSubscription = this.service.updateScripture(this.updateSutraForm.value.id, this.updateSutraForm.value).subscribe({
      next: (data: BuddistScripture) => {
        this.openSnackBar(`Scripture updated ( ${data.id} ) successfully`, 'Update Success!');
      }, error: (error: any) => {
        console.error(error);
      }
    });
  }

  onReset(): void {
    this.updateSutraForm.reset();
  }

  onCancel(): void {
    this.updateSutraForm.reset();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }

  ngOnDestroy(): void {
    if (this.sutraSubscription) {
      this.sutraSubscription.unsubscribe();
    }
    if (this.utilitySubscription) {
      this.utilitySubscription.unsubscribe();
    }
  }
}
