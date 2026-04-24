export interface IScriptureSchema {
  abbr: string;
  nameKr: string;
  nameCn?: string;
  nameEn?: string | null;

  originLang: string;
  originName?: string;
  tier: Tier;

  /// 권·부·책·Kanda·Bam po
  totalVolumes?: number;
  volumeUnit?: string;

  /// 품·분·회·편·장·문·Vagga·Parivarta·Nipāta·Le'u
  totalChapters?: number;
  chapterUnit?: string;

  ///  절·단·칙·경·사·장·Sutta·Pariccheda·Prakaraṇa·사도
  totalSections?: number;
  sectionUnit?: string;

  /// 게송·구·조·계·Gāthā·Śloka·Sikkhāpada
  totalVerses?: number;
  verseUnit?: string | null;

  primaryCategory?: string | null;
  majorCategory?: string | null;

  details?: string | null;

  readonly searchKey?: string | null;
}

// --- View
export interface IDharmaScriptureView extends IScriptureSchema { id: number; }

// --- Create
export interface IDharmaScriptureCreate extends IScriptureSchema { }

// --- Update
export interface IDharmaScriptureUpdate extends IScriptureSchema { id: number; }

export enum Tier {
  Core = 1, // 핵심 (누구나 아는 대표 경전)
  Important = 2, // 중요 (불교 공부에 필수적)
  Extensions = 3, // 확장 (전문 연구용)
}

