import { Injectable } from '@angular/core';
import { BuddhistQuote } from '@app/core/classes/buddhist-quote';
import { IBuddistQuote } from '@app/core/interfaces/i-buddist-quote';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {

  getRandomQuote(): IBuddistQuote {
    const idx = Math.floor(Math.random() * BuddhistQuote.buddhistQuotes.length);
    return BuddhistQuote.buddhistQuotes[idx];
  }

  getAllQuotes(): IBuddistQuote[] {
    return BuddhistQuote.buddhistQuotes;
  }

  // 추후 회원 등록 명언 검증용
  async validateQuote(quote: BuddhistQuote): Promise<boolean> {
    // AI 검증 로직 또는 필터링 로직
    // 욕설, 부적절한 내용 필터링
    return true;
  }
}
