import { CommonModule, JsonPipe, NgFor, DatePipe, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActionService } from '@app/services/action.service';
import { AuthService } from '@app/services/auth.service';
import { ChatService, IMessage } from '@app/services/chat.service';
import { CodeService } from '@app/services/code.service';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-viv-chat',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    JsonPipe, MatFormFieldModule,
    DatePipe,
    HighlightAuto,
    HighlightLineNumbers,
    MatIconModule,
    MatInputModule, MatSelectModule],
  templateUrl: './viv-chat.component.html',
  styleUrl: './viv-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    // { provide: 'LOCALE_ID', useValue: 'ko-KR' },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: 'ko-KR' }
  ]
})
export class VivChatComponent implements OnInit, AfterViewInit, OnDestroy {

  auth = inject(AuthService);
  chatService = inject(ChatService);
  codeService = inject(CodeService);
  actionService = inject(ActionService);
  datePipe = inject(DatePipe);
  render = inject(Renderer2);
  cdref = inject(ChangeDetectorRef);

  @ViewChild('msgContainer') msgContainer!: ElementRef;

  currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  message: string = '';
  messages: WritableSignal<IMessage[]> = signal([]);
  userName: string = '';
  constructor() {
    this.codeService.isElement.next(true);
    this.userName = this.auth.getUserDetail().fullName;
  }
  Omega = '\u{21aa}';
  mark = '\u{02748}';

  ngOnInit(): void {

    this.actionService.nextLoading(false);
    let message: IMessage = {
      user: this.userName,
      message: `(${this.currentDate})\t${this.userName}님께서 방에 입장하셨습니다.`
    };
    this.messages.set([... this.messages(), message]);
    this.chatService.getMessages().subscribe((data: IMessage) => {
      this.messages.set([...this.messages(), data]);

      this.cdref.detectChanges();
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    });
    this.actionService.nextLoading(false);

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  private scrollToBottom(): void {
    if (this.msgContainer) {
      this.render.setProperty(this.msgContainer.nativeElement, 'scrollTop', this.msgContainer.nativeElement.scrollHeight);
    }
  }

  sendMessage() {

    const message: IMessage = {
      user: this.userName,
      message: `${this.Omega} ${this.message}`
    };

    this.chatService.sendMessage(message);
    this.message = '';
    this.cdref.detectChanges();

    setTimeout(() => {
      this.scrollToBottom();
    }, 0);

    const messageInput = document.getElementById('messageInput');

    if (messageInput) {
      messageInput.focus();
      messageInput.click();
    }
  }

  ngOnDestroy(): void {
    const message: IMessage = {
      user: this.userName,
      message: `(${this.currentDate})\t${this.userName}님께서 방을 나가셨습니다.`
    };
    this.codeService.isElement.next(false);
    this.chatService.sendMessage(message);
  }
}
