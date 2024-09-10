import { CommonModule, CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, inject, Signal, signal, untracked, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '@app/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    NgFor,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {

  name: WritableSignal<string> = signal('viv');
  age: WritableSignal<number> = signal(30);

  resetAge() {
    // this.age.set(50);
    // this.age.update(value => value + 1);
    this.age.set(this.age() + 1);
    this.age.update(value => value + 1);

    console.log(this.age())

  }

  multiplier: WritableSignal<number> = signal(7);
  computeAge: Signal<number> = computed(() => {
    return this.age() * this.multiplier();
  });

  cdref = inject(ChangeDetectorRef);
  apiService = inject(ApiService);

  // An Array to store the output messages
  outputs: { time: string, message: string }[] = [];

  constructor() {

    // 이펙트는 컴포넌트가 생성될 때와 이름 신호가 변경될 때 실행되는 훅입니다.
    effect(() => { // effect is a hook that runs when the component is created, and whenever the name signal changes

      console.log(`Name: ${this.name()}, Age: ${this.age()}, Computed Age: ${this.computeAge()}}`);
      // console.log('name', this.name());
      // console.log('age', this.age());
      // untracked(() => { // untracked is a function that prevents the effect from running when the age signal changes
      //   console.log('Age', this.age());
      // })
    });
  }

  createObservable() {
    const observable = new Observable(subscriber => {
      subscriber.next(1); // Emit the first value
      subscriber.next(2);
      subscriber.next(3);
      subscriber.error(new Error('Something went wrong')); // Emit an error
      subscriber.next(4);
      subscriber.complete(); // Complete the sequence
    });

    // Explicit observer object
    const observer = {
      next: (value: any) => {
        this.outputs.push({ time: new Date().toLocaleTimeString(), message: value });
      },
      error: (error: any) => {
        console.error(error.message);
      },
      complete: () => {
        console.log('Completed');
      }
    };

    // Subscribe to the observable, 구독 시작
    observable.subscribe(observer);
  }

  ngOnInit() {
    this.createObservable();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
  }
}
