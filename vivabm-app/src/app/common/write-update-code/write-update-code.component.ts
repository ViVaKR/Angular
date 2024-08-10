import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Injector, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-write-update-code',
  standalone: true,
  imports: [],
  templateUrl: './write-update-code.component.html',
  styleUrl: './write-update-code.component.scss'
})
export class WriteUpdateCodeComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {

  @Input() title: string = '';
  @Input() division: boolean = true; // true: 쓰기, false: 수정

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild('code') code!: ElementRef;

  private _injector = inject(Injector);
  private fb = inject(FormBuilder);

  authService = inject(AuthService);
  codeService = inject(CodeService);

  elementRef = inject(ElementRef);
  cdredf = inject(ChangeDetectorRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  renderer = inject(Renderer2);
  snackbar = inject(MatSnackBar);

  isEmailConfirmed: boolean = false;
  form!: FormGroup;

  public fontOptions = (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => `${i + min}px`);

  rows: number = 5;
  rowArray = [5, 10, 15, 20, 25, 30, 40, 50, 100, 300, 500, 1000];

  status: boolean = false;
  isSpinner: boolean = false;

  lineSpace = 1.5;

  myClass = {
    'text-slate-400': true
  }

  fontSize = "2em";


  codeSubscription!: Subscription;
  authSubscription!: Subscription;

  newForm(val: string): void {
    this.form = this.fb.group({
      id: 0,
      title: [val, Validators.required],
      content: [val, Validators.required],
      create: [new Date()],
      note: [val],
      categoryId: [val],
    })
  }

  ngOnInit(): void {
    this.rows = 100;
    this.newForm('');
    if (this.division) {
      this.route.queryParams.subscribe({
        next: (params: any) => {
          const id = params['id'] as number;
          if (id === null || id === undefined) {
            this.form.controls['id'].setValue(1);
          }
        }
      })
    }
  }

  ngAfterViewInit(): void {
    //
  }
  ngAfterContentChecked(): void {
    //
  }

  ngOnDestroy(): void {
    //
  }

}
