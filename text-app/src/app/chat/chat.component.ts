import { Component, OnInit } from '@angular/core';
import { chatMessages } from './chat-messages';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  messages: any = [];
  totalOnline = 0;
  user = 1;

  constructor() { }

  ngOnInit() {
    this.messages = chatMessages;
  }
  sendMessage(message: string) {
    const nd = new Date;
    const data = {
      message,
      userId: this.user,
      time: nd.getHours() + ":" + nd.getMinutes()
    };

    this.messages = [...this.messages, data];
  }

}
