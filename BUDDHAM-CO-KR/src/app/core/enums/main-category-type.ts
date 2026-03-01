export enum MainCategoryType {

  // ════════════════════════════════
  //  1xx : 경전 (Canonical Texts)
  // ════════════════════════════════

  /**
   * 초기불교 경전
   * 팔리 니까야, 한역 아함경, 간다라 경전
   * Dīgha / Majjhima / Saṃyutta / Aṅguttara / Khuddaka Nikāya
   */
  EarlyBuddhism = 101,

  /**
   * 대승경전
   * 반야부, 법화부, 화엄부, 정토부, 열반부 등
   * 한역 대장경 경전류 전체
   */
  MahayanaSutra = 102,

  /**
   * 밀교 / 금강승 경전
   * 대일경, 금강정경, 각종 탄트라
   * 티베트 깐주르(Kangyur) 밀교부
   */
  TantraSutra = 103,

  /**
   * 티베트 경전
   * 깐주르(Kangyur) 현교부
   * 밀교가 아닌 일반 대승 티베트 전승
   */
  TibetanCanon = 104,

  /**
   * 본생담 (자타카)
   * 부처님 전생 이야기
   * Jātaka — 547화
   */
  Jataka = 105,

  // ════════════════════════════════
  //  2xx : 율장 / 계율
  // ════════════════════════════════

  /**
   * 율장
   * 사분율, 오분율, 십송율, 팔리율
   * 출가자 계율 규정
   */
  Vinaya = 201,

  /**
   * 재가 계율 / 보살계
   * 범망경 보살계, 우바새계경
   */
  LayVinaya = 202,

  // ════════════════════════════════
  //  3xx : 논장 / 논서
  // ════════════════════════════════

  /**
   * 논장 (아비달마)
   * 팔리 아비담마, 설일체유부 논서
   * 구사론, 발지론 등
   */
  Abhidharma = 301,

  /**
   * 대승 논서
   * 중관: 용수(龍樹) 중론, 회쟁론
   * 유식: 무착(無着) 섭대승론, 세친(世親) 유식30송
   * 기신론 등
   */
  MahayanaTreatise = 302,

  /**
   * 선 / 禪 어록
   * 벽암록, 무문관, 조주어록, 임제록
   * 육조단경 등 조사 어록
   */
  ZenRecord = 303,

  /**
   * 티베트 논서
   * 땐주르(Tengyur) — 인도 논서 티베트역
   * 티베트 고유 논서
   */
  TibetanTreatise = 304,

  // ════════════════════════════════
  //  4xx : 주석 / 해설
  // ════════════════════════════════

  /**
   * 고전 주석서
   * 붓다고사 청정도론(Visuddhimagga)
   * 원측 해심밀경소, 의상 화엄일승법계도 등
   */
  Commentary = 401,

  /**
   * 현대 해설 / 강의록
   * 현대 큰스님 법문 중 특정 경전 해설
   */
  ModernCommentary = 402,

  // ════════════════════════════════
  //  5xx : 수행 / 의례
  // ════════════════════════════════

  /**
   * 수행 지침 / 명상론
   * 청정도론 실천편, 위빠사나 지침서
   * 티베트 수행 지침 (람림 등)
   */
  PracticeGuide = 501,

  /**
   * 의식문 / 진언 / 다라니
   * 천수경, 각종 진언, 예불문
   * 의식집, 범패
   */
  Ritual = 502,

  // ════════════════════════════════
  //  6xx : 법문 / 기록
  // ════════════════════════════════

  /**
   * 법문 / 설법
   * 현대 또는 근현대 스님 법문
   * 특정 경전에 종속되지 않는 독립 법문
   */
  DharmaTalk = 601,

  /**
   * 불교사 / 전기
   * 부처님 생애, 고승전, 불교 역사서
   * 삼국유사 불교 관련, 해동고승전
   */
  History = 602,

  // ════════════════════════════════
  //  7xx : 문화 / 기타
  // ════════════════════════════════

  /**
   * 불교 문화 / 예술
   * 불교 시가, 찬불가, 불교 문학
   */
  Culture = 701,

  /**
   * 미분류
   */
  Unclassified = 999,
}

export interface MainCategoryTypeOption {
  value?: MainCategoryType;    // optional — 구분선용
  label: string;
  displayText: string;
  isDivider?: boolean;         // 구분선 플래그
}

export const MAINCATEGORY_OPTIONS: MainCategoryTypeOption[] = [

  // ── 경전 ──────────────────────────────────────
  { isDivider: true, label: '경전', displayText: '── 경전 (Canonical Texts) ──' },

  {
    value: MainCategoryType.EarlyBuddhism,
    label: '초기불교 경전',
    displayText: '초기불교 경전 (Early Buddhism / Nikāya · Āgama)'
  },

  {
    value: MainCategoryType.MahayanaSutra,
    label: '대승경전',
    displayText: '대승경전 (Mahāyāna Sūtra)'
  },

  {
    value: MainCategoryType.TantraSutra,
    label: '밀교경전',
    displayText: '밀교·금강승 경전 (Tantra / Vajrayāna)'
  },

  {
    value: MainCategoryType.TibetanCanon,
    label: '티베트 경전',
    displayText: '티베트 경전 (Tibetan Canon / Kangyur)'
  },

  {
    value: MainCategoryType.Jataka,
    label: '본생담',
    displayText: '본생담 (Jātaka)'
  },

  // ── 율장 ──────────────────────────────────────
  {
    isDivider: true, label: '율장',
    displayText: '── 율장 (Vinaya) ──'
  },

  {
    value: MainCategoryType.Vinaya,
    label: '율장',
    displayText: 'SutraCollectionSection (율장, 계율 관련)'
  },

  {
    value: MainCategoryType.LayVinaya,
    label: '재가계율',
    displayText: '재가계율·보살계 (Lay Vinaya / Bodhisattva Precepts)'
  },

  // ── 논장·논서 ─────────────────────────────────
  { isDivider: true, label: '논장·논서', displayText: '── 논장·논서 (Abhidharma · Treatise) ──' },

  {
    value: MainCategoryType.Abhidharma,
    label: '논장 (아비달마)',
    displayText: 'Abhidharma (논장, 아비달마 중관 유식 논서)'
  },

  {
    value: MainCategoryType.MahayanaTreatise,
    label: '대승 논서',
    displayText: '대승 논서 (Mahāyāna Śāstra — 중관·유식)'
  },

  {
    value: MainCategoryType.ZenRecord,
    label: '선어록',
    displayText: '선어록·공안 (Zen Record / Kōan — 벽암록·무문관)'
  },

  {
    value: MainCategoryType.TibetanTreatise,
    label: '티베트 논서',
    displayText: '티베트 논서 (Tengyur — 땐주르)'
  },

  // ── 주석·해설 ─────────────────────────────────
  { isDivider: true, label: '주석·해설', displayText: '── 주석·해설 (Commentary) ──' },

  {
    value: MainCategoryType.Commentary,
    label: '고전 주석서',
    displayText: '고전 주석서 (Classical Commentary — 청정도론·해심밀경소)'
  },

  {
    value: MainCategoryType.ModernCommentary,
    label: '현대 해설',
    displayText: '현대 해설·강의록 (Modern Commentary)'
  },

  // ── 수행·의례 ─────────────────────────────────
  { isDivider: true, label: '수행·의례', displayText: '── 수행·의례 (Practice · Ritual) ──' },

  {
    value: MainCategoryType.PracticeGuide,
    label: '수행 지침',
    displayText: '수행 지침·명상론 (Practice Guide — 위빠사나·람림)'
  },

  {
    value: MainCategoryType.Ritual,
    label: '의식문·진언',
    displayText: '의식문·진언·다라니 (Ritual / Dhāraṇī — 천수경·예불문)'
  },

  // ── 법문·기록 ─────────────────────────────────
  { isDivider: true, label: '법문·기록', displayText: '── 법문·기록 (Dharma Talk · History) ──' },

  {
    value: MainCategoryType.DharmaTalk,
    label: '법문',
    displayText: '법문·설법 (Dharma Talk)'
  },

  {
    value: MainCategoryType.History,
    label: '불교사·전기',
    displayText: '불교사·전기 (History / Biography — 고승전·삼국유사)'
  },

  // ── 기타 ──────────────────────────────────────
  { isDivider: true, label: '기타', displayText: '── 기타 ──' },

  {
    value: MainCategoryType.Culture,
    label: '문화·예술',
    displayText: '불교 문화·예술 (Culture / Buddhist Arts)'
  },

  {
    value: MainCategoryType.Unclassified,
    label: '미분류',
    displayText: '미분류 (Unclassified)'
  },
]
