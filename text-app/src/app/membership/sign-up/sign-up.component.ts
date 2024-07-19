import { NgIf, CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, Route, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterOutlet,
    MatSelectModule

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  form!: FormGroup;
  hidePassword = true;

  goTo() {
    this.router.navigate(['/SignIn']);
  }
  onCancel() {
    this.router.navigate(['/Home']);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      roles: [''],
    });
  }
  onSubmit() {
    //
  }


}
