import { Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule, KatexOptions } from 'ngx-markdown';
import { MermaidAPI } from 'ngx-markdown';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

// angular.json scripts 에 katex.min.js 로 전역 로드됨
declare const katex: any;

@Component({
  selector: 'markdown-viewer',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    MarkdownModule,
    // 🔥 ClipboardButtonComponent 제거 - injectCopyButton() 으로 직접 처리
  ],
  templateUrl: './markdown-viewer.html',
  styleUrl: './markdown-viewer.scss',
  encapsulation: ViewEncapsulation.None
})
export class MarkdownViewer {

  // ── KaTeX 옵션 ──────────────────────────────────────
  readonly katexOptions: KatexOptions = {
    throwOnError: false,
    strict: false,
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
  };

  // ── Mermaid 옵션 ────────────────────────────────────
  readonly mermaidOptions: MermaidAPI.MermaidConfig = {
    theme: 'neutral',
    look: 'classic',
    securityLevel: 'loose', // Angular 환경 필수
  };

  // ── Inputs ──────────────────────────────────────────
  content = input<string>('');
  compact = input<boolean>(false);
  theme = input<'default' | 'dharma' | 'dark'>('default');
  maxHeight = input<number>(0);
  emptyText = input<string>('내용이 없습니다.');

  // ── State ────────────────────────────────────────────
  readonly lightboxSrc = signal<string | null>(null);
  readonly lightboxAlt = signal<string>('');
  readonly copySuccess = signal<string | null>(null);

  // ── $$ 블록 임시 저장소 ──────────────────────────────
  private readonly mathBlocks = new Map<string, string>();

  // ── Computed ─────────────────────────────────────────
  readonly isEmpty = computed(() => !this.content()?.trim());

  readonly containerClass = computed(() => {
    return [
      'markdown-viewer',
      `theme-${this.theme()}`,
      this.compact() ? 'is-compact' : '',
    ].filter(Boolean).join(' ');
  });

  readonly containerStyle = computed(() => {
    const h = this.maxHeight();
    return h > 0 ? { 'max-height': `${h}px`, 'overflow-y': 'auto' } : {};
  });

  readonly processedContent = computed(() =>
    this.preProcessMath(this.content())
  );

  private preProcessMath(content: string): string {
    if (!content) return '';

    this.mathBlocks.clear();
    let index = 0;

    return content.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
      const key = `MATHBLOCK_${index++}`;
      this.mathBlocks.set(key, tex.trim());
      // 🔥 data-tex 에 key 만 저장 (LaTeX 원문 저장 시 HTML 인코딩 문제 방지)
      return `\n\n<div class="math-block" data-tex="${key}"></div>\n\n`;
    });
  }

  // ── ngx-markdown (ready) 이벤트 ──────────────────────
  // 🔥 순서 중요: renderMathBlocks → injectCopyButton → setImagesLazy
  onMarkdownReady(): void {
    // setTimeout 으로 mermaid 렌더링이 완전히 끝난 뒤 실행
    setTimeout(() => {
      this.renderMathBlocks();
      this.injectCopyButton();
      this.setImagesLazy();
    }, 0);
  }

  // ── $$ 블록 → KaTeX 렌더링 ───────────────────────────
  private renderMathBlocks(): void {
    const host = document.querySelectorAll('.markdown-viewer .math-block[data-tex]');

    host.forEach((el) => {
      const key = el.getAttribute('data-tex');
      if (!key) return;

      const tex = this.mathBlocks.get(key);
      if (tex === undefined) return;

      try {
        (el as HTMLElement).innerHTML = katex.renderToString(tex, {
          displayMode: true,
          throwOnError: false,
          strict: false,
        });
      } catch {
        (el as HTMLElement).textContent = `$$${tex}$$`;
      }
    });
  }

  // ── 코드 블록 복사 버튼 주입 ─────────────────────────
  private injectCopyButton(): void {
    document.querySelectorAll('.markdown-viewer pre code').forEach((el) => {
      const pre = el.parentElement as HTMLPreElement;
      if (pre.querySelector('.copy-btn')) return; // 중복 방지

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.title = '코드 복사';
      btn.innerHTML = `<span class="material-icons" style="font-size:14px">content_copy</span>`;

      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // lightbox 클릭 이벤트 전파 차단
        navigator.clipboard.writeText(el.textContent || '').then(() => {
          btn.innerHTML = `<span class="material-icons" style="font-size:14px">check</span>`;
          this.copySuccess.set(el.textContent?.slice(0, 20) ?? '');
          setTimeout(() => {
            btn.innerHTML = `<span class="material-icons" style="font-size:14px">content_copy</span>`;
            this.copySuccess.set(null);
          }, 2_000);
        });
      });

      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  }

  // ── 이미지 lazy-load ─────────────────────────────────
  private setImagesLazy(): void {
    document.querySelectorAll('.markdown-viewer img').forEach((img) => {
      (img as HTMLImageElement).loading = 'lazy';
    });
  }

  // ── 이미지 Lightbox ──────────────────────────────────
  openLightbox(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement;
      this.lightboxSrc.set(img.src);
      this.lightboxAlt.set(img.alt || '이미지');
    }
  }

  closeLightbox(): void {
    this.lightboxSrc.set(null);
  }
}
