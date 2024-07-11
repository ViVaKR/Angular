import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-error-matcher',
  templateUrl: './error-matcher.component.html',
  styleUrls: ['./error-matcher.component.css']
})
export class ErrorMatcherComponent implements ErrorStateMatcher {
  isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean
  {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
