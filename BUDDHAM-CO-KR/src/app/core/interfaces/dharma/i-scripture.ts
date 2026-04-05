export interface IScriptureSchema {
  abbr: string;
  nameKr: string;
  nameCn?: string;
  nameEn?: string | null;
  originLang: string;
  originName?: string;
  tier: Tier;

  totalVolumes?: number;
  volumeUnit?: string;

  totalChapters?: number;
  chapterUnit?: string;

  totalSections?: number;
  sectionUnit?: string;

  totalVerses?: number;
  verseUnit?: string | null;

  primaryCategory?: string | null;
  majorCategory?: string | null;

  readonly searchKey?: string | null;
}

// --- View
export interface IScriptureView extends IScriptureSchema {
  id: number;
}
export interface IDharmaScriptureView extends IScriptureSchema {
  id: number;
}

// --- Create
export interface IScriptureEntry extends IScriptureSchema {}
export interface IDharmaScriptureCreate extends IScriptureSchema {}

// --- Update
export interface IScripturePatch extends IScriptureSchema {
  id: number;
}
export interface IDharmaScriptureUpdate extends IScriptureSchema {
  id: number;
}

export enum Tier {
  Core = 1, // 핵심 (누구나 아는 대표 경전)
  Important = 2, // 중요 (불교 공부에 필수적)
  Extensions = 3, // 확장 (전문 연구용)
}
