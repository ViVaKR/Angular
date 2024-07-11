import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '@app/common/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  received: string = '';
  defaultValue: string = 'Hello, World!';
  itemAvailablility: boolean = false;

  receiveFromChild(value: string) {
    this.received = value;
  }
}
