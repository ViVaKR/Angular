import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { FormErrorStateMatcher } from '@app/core/classes/form-error-state-matcher';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Paths } from '@app/data/menu-data';
import { SignUpFormFacade } from './sign-up-form-facade';
import { SignUpCommand } from './sign-up-command';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp {

  router = inject(Router);
  matcher = new FormErrorStateMatcher();
  readonly hidePassword = signal(true);

  constructor(public formFacade: SignUpFormFacade, private command: SignUpCommand) { }

  hasError(controlName: string, error: string): boolean {
    const control = this.formFacade.form.get(controlName)
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched)
    );
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.hidePassword.update(v => !v);
  }

  goToSignIn = () => this.router.navigate([Paths.SignIn.url]);

  onCancel = () => this.router.navigate([Paths.Home.url])

  onSubmit(event: MouseEvent) {
    event.preventDefault();

    const payload = this.formFacade.submitValue();
    if (!payload) return;
    this.command.execute(payload);
  }
}
