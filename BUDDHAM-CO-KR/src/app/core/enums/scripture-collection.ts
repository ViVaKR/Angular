interface IScriptureCollection {
    value?: ScriptureCollection,
    label: string;
    displayText: string;
    isDivider?: boolean;
}
export enum ScriptureCollection {

    Divider = 0,

    // * ========== 상좌부 (팔리 삼장) ==========

    /**
     * 장부 (긴 경전)
     * Dīgha Nikāya
     */
    DighaNikaya = 101,

    /**
     * 중부 (중간 길이 경전)
     * Majjhima Nikāya
     */
    MajjhimaNikaya = 102,

    /**
     * 상윳따 니까야 (주제별 모음)
     * Saṃyutta Nikāya
     */
    SamyuttaNikaya = 103,

    /**
     * 앙굿따라 니까야 (숫자별 모음)
     * Aṅguttara Nikāya
     */
    AnguttaraNikaya = 104,

    /**
     * 소부 (잡다한 경전 모음)
     */
    KhuddakaNikaya = 105,

    // ========== 대승 (한역 대장경) ==========

    /**
     * 반야부 (반야경 계열)
     */
    PrajnaparamitaSection = 201,

    /**
     * 법화부 (법화경 계열)
     */
    LotusSection = 202,

    /**
     * 화엄부 (화엄경 계열)
     */
    AvatamsakaSection = 203,

    /**
     * 보적부 (대보적경 등)
     */
    RatnakutaSection = 204,

    /**
     * 열반부 (열반경 계열)
     */
    NirvanaSection = 205,

    /**
     * 대집부 (대방등대집경 등)
     */
    MahasannipatSection = 206,

    /**
     * 경집부 (기타 경전)
     */
    SutraCollectionSection = 207,

    // ★ 누락된 중요 대승 섹션들 ↓

    /**
     * 정토부 (淨土部)
     * 무량수경, 관무량수경, 아미타경
     * 한국 불교에서 매우 중요!
     */
    SukhavatiSection = 208,

    /**
     * 유마부 — 보적부에 포함되기도 하나
     * 유마경(維摩經)은 독립 분류하는 경우도 많음
     * 선택적으로 고려
     */
    VimalakirtiSection = 209,

    /**
     * 율장 (律藏) — 계율 관련
     * 사분율, 오분율 등
     * 경전 DB에 포함한다면 필요
     */
    Vinaya = 210,

    /**
     * 논장 (論藏) — 아비달마, 중관, 유식 논서
     * 경전은 아니지만 DB 확장시 필요
     */
    Abhidharma = 211,

    // ========== 밀교 (금강승) ==========

    /**
     * 밀교부 (탄트라)
     */
    TantraSection = 301,

    /**
     * 티베트 대장경 독립 분류
     * 깐주르 (Kangyur) — 불설부 1,169부
     * 불교 경전 DB라면 반드시 필요
     */
    Kangyur = 302,

    /**
     * 땐주르 (Tengyur) — 논소부 3,786부
     */
    Tengyur = 303,

    // ========== 기타 ==========
    /**
     * 미분류
     */
    Unclassified = 999,
}

export const SCRIPTURE_COLLECTION_OPTIONS: IScriptureCollection[] = [

    // 상좌부
    { value: ScriptureCollection.Divider, label: '상좌부', displayText: '상좌부 (팔리 삼장)', isDivider: true },

    { value: ScriptureCollection.DighaNikaya, label: '장부', displayText: 'DighaNikaya (장부, 긴 경전)' },
    { value: ScriptureCollection.MajjhimaNikaya, label: '중부', displayText: 'MajjhimaNikaya (중부, 중간길이 경전)' },
    { value: ScriptureCollection.SamyuttaNikaya, label: '상윳따 니까야', displayText: 'SamyuttaNikaya (상윳따, 주제별)' },
    { value: ScriptureCollection.AnguttaraNikaya, label: '앙굿따라 니까야', displayText: 'AnguttaraNikaya (앙굿따라 니까야, 주제별 모음)' },
    { value: ScriptureCollection.KhuddakaNikaya, label: '소부', displayText: 'KhuddakaNikaya (소부, 기타 경전 모음)' },

    // 대승 (한역 대장경)
    { value: ScriptureCollection.Divider, label: '대승', displayText: '대승 (한역 대장경)', isDivider: true },

    { value: ScriptureCollection.PrajnaparamitaSection, label: '반야부', displayText: 'PrajnaparamitaSection (반야부, 반야경 계열)' },
    { value: ScriptureCollection.LotusSection, label: '법화부', displayText: 'LotusSection (법화부, 법화경 계열)' },
    { value: ScriptureCollection.AvatamsakaSection, label: '화엄부', displayText: 'AvatamsakaSection (화엄부, 화엄경 계열)' },
    { value: ScriptureCollection.RatnakutaSection, label: '보적부', displayText: 'RatnakutaSection (보적부, 대보적경 등)' },
    { value: ScriptureCollection.NirvanaSection, label: '열반부', displayText: 'NirvanaSection (열반부, 열반경 계열)' },
    { value: ScriptureCollection.MahasannipatSection, label: '대집부', displayText: 'MahasannipatSection (대집부)' },
    { value: ScriptureCollection.SutraCollectionSection, label: '경집부', displayText: 'SutraCollectionSection (경집부, 기타 경전)' },

    { value: ScriptureCollection.SukhavatiSection, label: '정토부', displayText: 'SukhavatiSection (정토부, 무량수경, 관무량수경, 아미타경)' },
    { value: ScriptureCollection.VimalakirtiSection, label: '유마부', displayText: 'VimalakirtiSection (유마부)' },
    { value: ScriptureCollection.Vinaya, label: '율장', displayText: 'SutraCollectionSection (율장, 계율 관련)' },
    { value: ScriptureCollection.Abhidharma, label: '논장', displayText: 'SutraCollectionSection (논장, 아비달마 중관 유식 논서)' },

    // 밀교부 (탄트라)
    { value: ScriptureCollection.Divider, label: '밀교부', displayText: '밀교부 (금강승)', isDivider: true },
    { value: ScriptureCollection.TantraSection, label: '밀교부', displayText: 'TantraSection (밀교부, 탄트라)' },
    { value: ScriptureCollection.Kangyur, label: '깐주르', displayText: 'Kangyur (깐주르, 티베트 대장경 분류, 불설부 1,169부)' },
    { value: ScriptureCollection.Tengyur, label: '땐주르', displayText: 'Tengyur (땐주르, 논소부 3,786부)' },

    // 기타
    { value: ScriptureCollection.Divider, label: '기타', displayText: '기타', isDivider: true },
    { value: ScriptureCollection.Unclassified, label: '미분류', displayText: 'Unclassified (미분류)' },
]
