import { Injectable, isDevMode } from '@angular/core';

declare const Kakao: any;

export interface KakaoShareOptions {
  title: string;        // 경전 구문 제목
  description: string;  // 짧은 내용 미리보기
  imageUrl?: string;    // 썸네일 (없으면 기본 사찰 이미지)
  linkUrl: string;      // 공유 후 클릭시 이동할 URL
}

@Injectable({ providedIn: 'root' })
export class KakaoService {

  private isReady(): boolean {
    const ready = typeof Kakao !== 'undefined' && Kakao.isInitialized();

    if (!ready && isDevMode()) {
      console.error('[KakaoSDK] ❌ SDK가 초기화되지 않았습니다. AppComponent 를 확인하세요.');
    }
    return ready;
  }

  // 🔥 피드형 공유
  shareDharma(options: KakaoShareOptions): void {
    if (!this.isReady()) return; // 초기화 안됐으면 중단

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: options.title,
        description: options.description,
        imageUrl: options.imageUrl ?? ``,
        link: {
          mobileWebUrl: options.linkUrl,
          webUrl: options.linkUrl

        },
      },
      buttons: [
        {
          title: '법문 읽기',
          link: {
            mobileWebUrl: options.linkUrl,
            webUrl: options.linkUrl,
          }
        }
      ]
    });
  }

  // 🔥 텍스트만 공유 (경전 짧은 구문 특화)
  shareScripture(verse: string, sourceUrl: string): void {
    if (!this.isReady()) return;

    Kakao.Share.sendDefault({
      objectType: 'text',
      text: verse,
      link: {
        mobileWebUrl: sourceUrl,
        webUrl: sourceUrl,
      },
      buttons: [
        {
          title: '전체 법문 보기',
          link: {
            mobileWebUrl: sourceUrl,
            webUrl: sourceUrl,
          },
        },
      ],
    });
  }
}
