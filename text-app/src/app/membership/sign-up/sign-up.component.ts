import { NgIf, CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  errorMessage: any;
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  form!: FormGroup;

}
