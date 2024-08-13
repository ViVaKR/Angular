import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignOutComponent {

  fb = inject(FormBuilder);
  router = inject(Router);


}
