import { ILanguageOption } from "@app/core/interfaces/i-language-option";

export enum OriginalLanguage {

  /// <summary>팔리어 - 상좌부 경전</summary>
  Pali,

  /// <summary>산스크리트어 - 대승 경전</summary>
  Sanskrit,

  /// <summary>티베트어 - 금강승 경전</summary>
  Tibetan,

  /// <summary>고대 한국어 (이두/향찰)</summary>
  ClassicalKorean,

  /// <summary>한문 - 동아시아 전통</summary>
  ClassicalChinese,

  /// <summary>일본어 (고전)</summary>
  ClassicalJapanese,

  /// <summary>몽골어</summary>
  Mongolian,

  /// <summary>만주어</summary>
  Manchu,

  /// <summary>우이구르어</summary>
  Uyghur,

  /// <summary>간다라어 (Prakrit 계열)</summary>
  Gandhari,

  /// <summary>소그드어</summary>
  Sogdian,

  /// <summary>토하라어</summary>
  Tocharian,

  /// <summary>현대 번역본</summary>
  Modern
}

export const ORIGINAL_LANG_OPTIONS: ILanguageOption[] = [
  { value: OriginalLanguage.Pali, label: '팔리어', displayText: 'Pali (팔리어)' },
  { value: OriginalLanguage.Sanskrit, label: '산스크리트어', displayText: 'Sanskrit (산스크리트어)' },
  { value: OriginalLanguage.Tibetan, label: '티베트어', displayText: 'Tibetan (티베트어)' },
  { value: OriginalLanguage.ClassicalKorean, label: '고대 한국어', displayText: 'ClassicalKorean (고대 한국어)' },
  { value: OriginalLanguage.ClassicalChinese, label: '한문', displayText: 'ClassicalChinese (한문)' },
  { value: OriginalLanguage.ClassicalJapanese, label: '일본어', displayText: 'ClassicalJapanese (일본어)' },
  { value: OriginalLanguage.Mongolian, label: '몽골어', displayText: 'Mongolian (몽골어)' },
  { value: OriginalLanguage.Manchu, label: '만주어', displayText: 'Manchu (만주어)' },
  { value: OriginalLanguage.Uyghur, label: '위구르어', displayText: 'Uyghur (위구르어)' },
  { value: OriginalLanguage.Gandhari, label: '간다라어', displayText: 'Gandhari (간다라어)' },
  { value: OriginalLanguage.Sogdian, label: '소그드어', displayText: 'Sogdian (소그드어)' },
  { value: OriginalLanguage.Tocharian, label: '토하라어', displayText: 'Tocharian (토하라어)' },
  { value: OriginalLanguage.Modern, label: '현대 번역본', displayText: 'Modern (현대 번역본)' },

];
// export const OriginalLanguageLabel: Record<OriginalLanguage, string> = {
//   [OriginalLanguage.Pali]: "팔리어",
//   [OriginalLanguage.Sanskrit]: "산스크리트어",
//   [OriginalLanguage.Tibetan]: "티베트어",
//   [OriginalLanguage.ClassicalKorean]: "고대 한국어",
//   [OriginalLanguage.ClassicalChinese]: "한문",
//   [OriginalLanguage.ClassicalJapanese]: "일본어",
//   [OriginalLanguage.Mongolian]: "몽골어",
//   [OriginalLanguage.Manchu]: "만주어",
//   [OriginalLanguage.Uyghur]: "위구르어",
//   [OriginalLanguage.Gandhari]: "간다라어",
//   [OriginalLanguage.Sogdian]: "소그드어",
//   [OriginalLanguage.Tocharian]: "토하라어",
//   [OriginalLanguage.Modern]: "현대 번역본",
// };

// export const ORIGINAL_LANG_OPTIONS: ILanguageOption[] =
//   Object.values(OriginalLanguage).filter(v => typeof v === 'number')
//     .map(v => ({
//       value: v,
//       label: OriginalLanguageLabel[v],
//       displayText: `${OriginalLanguage[v]} (${OriginalLanguageLabel[v]})`
//     }));
