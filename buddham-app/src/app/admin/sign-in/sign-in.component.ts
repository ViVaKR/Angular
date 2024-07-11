import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  // EventEmitter<T> : 데코레이터 타입
  @Output() signeIn = new EventEmitter<string>();

  paseSignIn(value: string) {
    this.signeIn.emit(value)
  }
}
