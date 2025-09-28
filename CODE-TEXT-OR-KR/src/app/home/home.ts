import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: []
})
export class Home {

  title = 'Home';

  message = ['인', '간', '이', '-', '이', '해', '하', '는', '-', '코', '드', '조', '각'];

  // message = ['인', '간', '이', '-', '이', '해', '하', '는', '-', '코', '드', '조', '각', '.', '.', '.']; // '인간이 이해하는 코드 조각...';

  // fullName = signal('Kim Bum Jun');
  // isTrial = signal(false);
  // isTrialExpired = signal(false);

  // showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());

  // count = signal(0);
  // showCount = signal(false);
  // private injector = inject(Injector);

  // conditionalCount = computed(() => {
  //   if (this.showCount()) {
  //     return `The count is ${this.count()}.`;
  //   } else {
  //     return 'Nothing to see here!';
  //   }
  // });

  constructor() {
    // this.fullName.set("Viv");
    // this.fullName.update(x => x.toUpperCase());

    // this.isTrial.set(true);

    // this.count.set(125);
    // this.count.update(value => value + 1);

    // // Register a new effect.
    // effect(() => {
    //   console.log(`The count is: ${this.count()}`);
    // });

    // this.loggingEffect;
  }

  // private loggingEffect = effect(() => {
  //   console.log(`The new count is: ${this.count()}`);

  // });

  // initializeLogging(): void {
  //   effect(() => {
  //     console.log(`The initialze count is: ${this.count()}`);
  //   }, { injector: this.injector });
  // }
}
