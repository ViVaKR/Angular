import { IScriptureMasterRead } from "./i-scripture-master-read";

export interface IScriptureParagraph {
  id: number;

  title?: string;

  // 경전 마스터 연결
  scriptureMasterId: number;

  // ══════════════════════════════════════════════
  //  계층 구조 — 불교 전통 용어 기반
  //  실제 의미는 StructureType에 따라 달라지지만
  //  필드명 자체는 직관적인 불교 용어 사용
  // ══════════════════════════════════════════════

  /**
   * 1단계 : 가장 큰 물리적 단위
   *
   * 대승경전  → 권 (卷, Volume)     예: 화엄경 제1권
   * 팔리니까야 → 니까야 (Nikāya)    예: 장부(Dīgha)=1
   * 아함경    → 아함 (Āgama)        예: 장아함=1
   * 티베트    → 깐주르 섹션         예: 1
   * 반야심경  → null (해당없음)
   */
  volume?: number;
  volumeTitle?: string;

  /**
   * 2단계 : 중간 논리적 묶음
   *
   * 대승경전  → 품 (品, Chapter)    예: 법화경 방편품=2
   * 팔리니까야 → 품 (Vagga)         예: 초전법륜품=1
   * 아함경    → 분 (分)
   * 선어록    → 칙 (則, 공안번호)   예: 벽암록 제1칙
   * 반야심경  → null
   */
  chapter?: number;
  chapterTitle?: string;

  /**
     * 3단계 : 실질적 경전 콘텐츠 단위
     *
     * 대부분    → 경 / 단락 (Sutta / Section)
     * 팔리니까야 → 경 (Sutta)         예: 범망경=1
     * 대승경전  → 절 / 단락
     * 반야심경  → 단락 (§1~§5)
     * 법구경    → 품 (1~26)           ← 여기가 최상위
     */
  section?: number;
  sectionTitle?: string;

  /**
     * 4단계 : 텍스트 원자 단위
     *
     * 모든 경전 → 게송 / 절 (Verse / Gāthā)
     * 법구경    → 게송 번호 (1~423)
     * 반야심경  → 절 번호 (v01~v15)
     * 팔리경전  → 단락 번호
     */
  verse?: number;
  verseTitle?: string;


  // ══════════════════════════════════════════════
  //  정렬 & 검색
  // ══════════════════════════════════════════════

  /**
   * 전체 정렬용 시퀀스
   * 자동계산: volume*1000000 + chapter*10000 + section*100 + verse
   * 또는 수동 입력
   */
  sortOrder: number;

  /**
   * 경전 내 고유 참조 코드 (선택)
   * 예: "HJS-§1-v01"  (반야심경)
   *     "Dhp-1-001"   (법구경 1품 1게송)
   *     "DN-1-1-1"    (장부 1경 1품 1절)
   */
  refCode?: string;

  // ══════════════════════════════════════════════
  //  본문
  // ══════════════════════════════════════════════
  content: string;           // 한글
  chineseContent?: string;   // 한문
  originalContent: string;   // 원문

  commentary?: string;       // 해설
  keywords?: string;         // 검색 키워드

  master: IScriptureMasterRead;

}

/**
 * 경전 구조 레이블 정의
 * ScriptureMaster와 1:1 관계
 * 각 경전마다 4단계의 레이블이 무엇인지 정의
 */
export interface IScriptureStructureLabel {
  id?: number;
  scriptureMasterId: number;

  // 각 단계의 한글명 / 영문명 / 산스크리트명
  volumeLabel?: string;   // "권"   / "Volume"  / "Vastu"
  chapterLabel?: string;   // "품"   / "Chapter" / "Vagga"
  sectionLabel?: string;   // "단락" / "Section" / "Sutta"
  verseLabel?: string;   // "게송" / "Verse"   / "Gāthā"

  // 사용 여부 플래그
  useVolume: boolean;   // false = 해당 단계 숨김
  useChapter: boolean;
  useSection: boolean;
  useVerse: boolean;
}

// 주요 경전별 사전 정의 데이터 예시
export const STRUCTURE_LABEL_PRESETS: Record<string, IScriptureStructureLabel> = {

  '반야심경': {
    scriptureMasterId: 1,  // 실제 ID로 교체
    volumeLabel: undefined, useVolume: false,
    chapterLabel: undefined, useChapter: false,
    sectionLabel: '단락 (段, section)', useSection: true,
    verseLabel: '절 (節, verse)', useVerse: true,
  },

  '법구경': {
    scriptureMasterId: 0,
    volumeLabel: undefined, useVolume: false,
    chapterLabel: undefined, useChapter: false,
    sectionLabel: '품 (品)', useSection: true,
    verseLabel: '게송 (偈頌)', useVerse: true,
  },

  '법화경': {
    scriptureMasterId: 0,
    volumeLabel: '권 (卷)', useVolume: true,
    chapterLabel: '품 (品)', useChapter: true,
    sectionLabel: undefined, useSection: false,
    verseLabel: '절 (節)', useVerse: true,
  },

  '화엄경': {
    scriptureMasterId: 0,
    volumeLabel: '권 (卷)', useVolume: true,
    chapterLabel: '품 (品)', useChapter: true,
    sectionLabel: '장 (章)', useSection: true,
    verseLabel: '절 (節)', useVerse: true,
  },

  '장부 (Dīgha Nikāya)': {
    scriptureMasterId: 0,
    volumeLabel: undefined, useVolume: false,
    chapterLabel: '품 (Vagga)', useChapter: true,
    sectionLabel: '경 (Sutta)', useSection: true,
    verseLabel: '절', useVerse: true,
  },

  '벽암록': {
    scriptureMasterId: 0,
    volumeLabel: undefined, useVolume: false,
    chapterLabel: undefined, useChapter: false,
    sectionLabel: '칙 (則)', useSection: true,   // 공인번호
    verseLabel: '단락', useVerse: true,
  },
};

// 최종 기본값
export const DEFAULT_STRUCTURE_LABEL: IScriptureStructureLabel = {
  scriptureMasterId: 0,
  volumeLabel: '권 (卷, Volume)', useVolume: true,
  chapterLabel: '품 (品, Chapter)', useChapter: true,
  sectionLabel: '단락 (段, Section)', useSection: true,
  verseLabel: '게송 (偈, Verse)', useVerse: true,
};
