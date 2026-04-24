import { inject, Injectable } from '@angular/core';
import { AlertService } from './alert-service';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({ providedIn: 'root' })
export class ShareService {

  private clipboard = inject(Clipboard);
  private alertService = inject(AlertService);

  /**
    * Web Share API 사용 (모바일 네이티브 공유)
  */
  async shareNative(data: { title: string; text: string; url: string; }): Promise<boolean> {
    if (!navigator.share) return false;
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
      return false;
    }
  }

  /**
    * URL 클립보드 복사
  */
  copyToCipboard(url: string, message: string = 'URL이 복사되었습니다.'): void {
    const success = this.clipboard.copy(url);

    if (success) {
      this.alertService.openSheet([{
        title: message,
        content: url
      }]);
    } else {
      this.alertService.openSheet([{
        title: '복사에 실패했습니다.',
        content: url
      }]);
    }
  }
  /**
     * SNS 공유 URL 생성
     */
  getSocialShareUrls(url: string, title: string, text: string) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      kakao: `https://story.kakao.com/share?url=${encodedUrl}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`
    };
  }
  /**
   * 새 창으로 SNS 공유
   */
  openShareWindow(url: string, width: number = 600, height: number = 500): void {
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(url, 'share', `width=${width}, left=${left}, top=${top}`);
  }


}
