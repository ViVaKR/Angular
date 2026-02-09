export enum OriginalLanguage {
  Pali = 'Pali',
  Sanskrit = 'Sanskrit',
  Tibetan = 'Tibetan',
  ClassicalKorean = 'ClassicalKorean', // 한국 찬술 (한문)
  ClassicalChinese = 'Chinese',
}

export enum PaliLanguage {
  Sinhala = 1, // 스리랑카 전통
  Burmese = 2, // 미얀마 전통
  Thai = 3, // 태국 전통
  Devanagari = 4 // 인도 전통
}

export interface LanguageOption {
  value: OriginalLanguage;
  label: string;
  displayText: string;
}

export const ORIGINAL_LANG_OPTIONS: LanguageOption[] = [
  {
    value: OriginalLanguage.Pali,
    label: '팔리어',
    displayText: 'Pali (팔리어)'
  },
  {
    value: OriginalLanguage.Sanskrit,
    label: '산스크리트어',
    displayText: 'Sanskrit (산스크리트어)'
  },
  {
    value: OriginalLanguage.Tibetan,
    label: '티베트어',
    displayText: 'Tibetan (티베트어)'
  },
  {
    value: OriginalLanguage.ClassicalKorean,
    label: '한국 문헌',
    displayText: 'ClassicalKorean (한국 문헌)'
  },
  {
    value: OriginalLanguage.ClassicalChinese,
    label: '중국 문헌',
    displayText: 'Chinese (중국 문헌)'
  }
];
