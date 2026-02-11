interface IScriptureCollection {
    value?: ScriptureCollection,
    label: string;
    displayText: string;
}
export enum ScriptureCollection {

    Divider = 0,

    // ========== 상좌부 (팔리 삼장) ==========

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

    // ========== 밀교 (금강승) ==========

    /**
     * 밀교부 (탄트라)
     */
    TantraSection = 301,

    // ========== 기타 ==========
    /**
     * 미분류
     */
    Unclassified = 999,
}

export const SCRIPTURE_COLLECTION_OPTIONS: IScriptureCollection[] = [

    // 상좌부
    { value: ScriptureCollection.Divider, label: '상좌부', displayText: '상좌부 (팔리 삼장)' },

    { value: ScriptureCollection.DighaNikaya, label: '장부', displayText: 'DighaNikaya (장부, 긴 경전)' },
    { value: ScriptureCollection.MajjhimaNikaya, label: '중부', displayText: 'MajjhimaNikaya (중부, 중간길이 경전)' },
    { value: ScriptureCollection.SamyuttaNikaya, label: '상윳따 니까야', displayText: 'SamyuttaNikaya (상윳따, 주제별)' },
    { value: ScriptureCollection.AnguttaraNikaya, label: '앙굿따라 니까야', displayText: 'AnguttaraNikaya (앙굿따라 니까야, 주제별 모음)' },
    { value: ScriptureCollection.KhuddakaNikaya, label: '소부', displayText: 'KhuddakaNikaya (소부, 기타 경전 모음)' },

    // 대승 (한역 대장경)
    { value: ScriptureCollection.Divider, label: '대승', displayText: '대승 (한역 대장경)' },

    { value: ScriptureCollection.PrajnaparamitaSection, label: '반야부', displayText: 'PrajnaparamitaSection (반야부, 반야경 계열)' },
    { value: ScriptureCollection.LotusSection, label: '법화부', displayText: 'LotusSection (법화부, 법화경 계열)' },
    { value: ScriptureCollection.AvatamsakaSection, label: '화엄부', displayText: 'AvatamsakaSection (화엄부, 화엄경 계열)' },
    { value: ScriptureCollection.RatnakutaSection, label: '보적부', displayText: 'RatnakutaSection (보적부, 대보적경 등)' },
    { value: ScriptureCollection.NirvanaSection, label: '열반부', displayText: 'NirvanaSection (열반부, 열반경 계열)' },
    { value: ScriptureCollection.MahasannipatSection, label: '대집부', displayText: 'MahasannipatSection (대집부)' },
    { value: ScriptureCollection.SutraCollectionSection, label: '경집부', displayText: 'SutraCollectionSection (경집부, 기타 경전)' },

    // 밀교부 (탄트라)
    { value: ScriptureCollection.Divider, label: '밀교부', displayText: '밀교부 (탄트라)' },
    { value: ScriptureCollection.TantraSection, label: '밀교부', displayText: 'TantraSection (밀교부, 탄트라)' },

    // 기타
    { value: ScriptureCollection.Divider, label: '기타', displayText: '기타' },
    { value: ScriptureCollection.Unclassified, label: '미분류', displayText: 'Unclassified (미분류)' },
]
