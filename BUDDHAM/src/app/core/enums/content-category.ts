export enum ContentCategory {
  Transcription = 1, // 사경
  Translation = 2, // 번역
  Summary = 3, // 요약
  Commentary = 4, // 주석, 해설
  FreeWriting = 5 // 자유 글쓰기
}

export interface ContentCategoryOption {
  value: ContentCategory;
  label: string;
  displayText: string;
}

export const CONTENTCATEGORY_OPTIONS: ContentCategoryOption[] = [
  { value: ContentCategory.Transcription, label: '사경', displayText: 'Transcription (사경)' },
  { value: ContentCategory.Translation, label: '번역', displayText: 'Translation (번역)' },
  { value: ContentCategory.Summary, label: '요약', displayText: 'Summary (요약)' },
  { value: ContentCategory.Commentary, label: '주석, 해설', displayText: 'Commentary (주석, 해설)' },
  { value: ContentCategory.FreeWriting, label: '자유 글쓰기', displayText: 'FreeWriting (자유 글쓰기)' }
]
