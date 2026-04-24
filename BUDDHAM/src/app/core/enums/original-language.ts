import { ILanguageOption } from "@app/core/interfaces/i-language-option";

export enum OriginalLanguage {

  // * ===== 인도계 =====

  /**
   * 팔이어 - 상좌부 삼장
   */
  Pali = 1,

  /**
   * 산스크리트어 - 대승 원전
   */
  Sanskrit = 2,

  /**
   * 혼합 산스크리트 - 불교 혼성어
   * 대부분의 대승 경전이 여기 해당
   */
  HybridSanskrit = 3,

  // * ===== 동아시아 =====

  /**
   * 한문 - 한역본
   */
  ClassicalChinese = 10,

  /**
   * 티베트어 - 티베트 대장경
   */
  Tibetan = 11,

  /**
   * 몽골어
   */
  Mongolian = 12,

  // * ==== 중앙아시아 ====

  /**
   * 간다라어 (카로슈티 문자) — 최초 불교 문헌
   */
  Gandhari = 20,

  /**
   * 소그드어 — 실크로드 전파 매개
   */
  Sogdian = 21,

  // * ===== 현대 번역 =====

  /**
   * 한국어
   */
  Korean = 30,            // 한국어

  /**
   * 일본어
   */
  Japanese = 31,          // 일본어

  /**
   * 영어
   */
  English = 32,           // 영어

  /**
   * 미분류
   */
  Unclassified = 99
}

export const ORIGINAL_LANG_OPTIONS: ILanguageOption[] = [
  { value: OriginalLanguage.Pali, label: '팔리어', displayText: 'Pali (팔리어 - 상좌부 삼장)' },
  { value: OriginalLanguage.Sanskrit, label: '산스크리트어', displayText: 'Sanskrit (산스크리트어 - 대승 원전)' },
  { value: OriginalLanguage.HybridSanskrit, label: '혼합 산스크리트', displayText: 'HybridSanskrit (혼합 산스크리트어 - 불교 혼성어)' },

  // * ==== 동 아시아 ====
  { value: OriginalLanguage.ClassicalChinese, label: '한문', displayText: 'ClassicalChinese (한문 - 한역본)' },
  { value: OriginalLanguage.Tibetan, label: '티베트어', displayText: 'Tibetan (티베트어 - 티베트 대장경)' },
  { value: OriginalLanguage.Mongolian, label: '몽골어', displayText: 'Mongolian (몽골어)' },

  // * ==== 중앙 아시아 ====
  { value: OriginalLanguage.Gandhari, label: '간다라어', displayText: 'Gandhari (간다라어 - 최초 불교문헌)' },
  { value: OriginalLanguage.Sogdian, label: '소그드어', displayText: 'Sogdian (소그드어 - 실크로드 전파매개)' },

  // * ==== 현대번역 ====
  { value: OriginalLanguage.Korean, label: '한국어', displayText: 'Korean (한국어))' },
  { value: OriginalLanguage.Japanese, label: '일본어', displayText: 'Japanese (일본어)' },
  { value: OriginalLanguage.English, label: '영어', displayText: 'English (영어)' },

  { value: OriginalLanguage.Unclassified, label: '미분류', displayText: 'Unclassified (미분류)' },

];
