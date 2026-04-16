import { Clipboard } from '@angular/cdk/clipboard'; // 추가
import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { OllamaService } from '@app/core/services/ollama/ollama-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { ClipboardButtonComponent, MarkdownModule } from 'ngx-markdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ollama-chat',
  imports: [CommonModule,
    ...MATERIAL_COMMON,
    MarkdownModule],
  templateUrl: './ollama-chat.html',
  styleUrl: './ollama-chat.scss'
})
export class OllamaChat {


  @ViewChild('scrollArea') scrollArea!: ElementRef;

  readonly clipboardButton = ClipboardButtonComponent;
  private userScrolled = signal<boolean>(false);

  // 스크롤 이벤트 감지
  onScroll(el: HTMLElement) {
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    this.userScrolled.set(!isAtBottom); // 바닥 근처가 아니면 사용자가 위로 올린 것
  }


  question = '';

  // 스트리밍 중 raw 텍스트 버퍼
  streamBuffer = signal<string>('');
  // 완료 후 마크다운 렌더링용
  finalAnswer = signal<string | null>(null);
  loading = signal<boolean>(false);

  // 1. 명언 리스트 추가
  private wisdoms = [
    "강물은 흐르기를 멈추지 않으나, 그 속의 달은 항상 고요합니다.",
    "마음이 일어나면 모든 것이 일어나고, 마음이 사라지면 모든 것이 사라집니다.",
    "한 송이 꽃이 피어남에 온 우주가 함께합니다.",
    "비우면 비울수록 채워지는 것이 지혜의 이치입니다."
  ];
  currentWisdom = signal<string>('');

  private sub?: Subscription;

  constructor(
    private ollamaService: OllamaService,
    private clipboard: Clipboard
  ) { }
  // streamBuffer가 업데이트될 때마다 호출
  isThinking(): boolean {
    const content = this.streamBuffer();
    // <think>는 있고 </think>는 아직 없는 상태면 '사유 중'
    return content.includes('<think>') && !content.includes('</think>');

  }
  // <think>와 </think>를 제거하고 텍스트만 반환하는 메서드
  getCleanStreamText(): string {
    return this.streamBuffer()
      .replace(/<think>/g, '')
      .replace(/<\/think>/g, '');
  }

  copyAll() {
    const text = this.finalAnswer();
    if (text) {
      this.clipboard.copy(text.replace(/<think>[\s\S]*?<\/think>/g, '').trim());
      // 스낵바나 토스트로 "지혜를 갈무리하였습니다"라고 띄워주면 베스트!
    }
  }

  onCopyToClipboard() {
    alert('Copied to clipboard');
  }

  demo() {
    alert("Hello, World");
  }

  ask() {
    if (!this.question.trim() || this.loading()) return;

    // 초기화
    this.streamBuffer.set('');
    this.finalAnswer.set(null);
    this.loading.set(true);

    this.currentWisdom.set(this.wisdoms[Math.floor(Math.random() * this.wisdoms.length)]);

    this.sub = this.ollamaService
      .askStream(this.question)
      .subscribe({
        next: (token) => {
          // 스트리밍 중: 버퍼에 누적, 마크다운 재파싱 안 함
          this.streamBuffer.update(x => x + token);
          this.scrollToBottom();
        },
        error: () => {
          this.streamBuffer.update(x => x + '\n\n[연결 오류]');
          this.finalAnswer.set(this.streamBuffer());
          this.loading.set(false);
        },
        complete: () => {
          // 완료 시: 버퍼 내용을 finalAnswer로 옮겨 마크다운 렌더링
          this.finalAnswer.set(this.streamBuffer());
          this.streamBuffer.set('');
          this.loading.set(false);
          // 완료 후 맨 위로 스크롤
          setTimeout(() => {
            const el = this.scrollArea?.nativeElement;
            if (el) el.scrollTop = 0;
          });
        },
      });
  }

  stop() {
    // 중단 시에도 현재까지 내용은 마크다운으로 렌더링
    this.finalAnswer.set(this.streamBuffer());
    this.streamBuffer.set('');
    this.sub?.unsubscribe();
    this.loading.set(false);
  }

  private scrollToBottom() {
    if (this.userScrolled()) return; // 사용자가 읽는 중이면 스킵
    setTimeout(() => {
      const el = this.scrollArea?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }



  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.ask();
    }
  }
}
