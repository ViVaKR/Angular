import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-demo-child',
  imports: [],
  templateUrl: './demo-child.html',
  styleUrl: './demo-child.scss'
})
export class DemoChild {

  fromParent = input<string>('Parent Data');

  messageEvent = output<string>();
  numberEvent = output<number>();

  sendMessage(): void {

    const data = `자식에서 보낸 메시지: ${new Date().toLocaleTimeString()}}`

    this.messageEvent.emit(data);
  }

  sendNumber(): void {
    const number = Math.floor(Math.random() * 100);
    this.numberEvent.emit(number);
  }
}
