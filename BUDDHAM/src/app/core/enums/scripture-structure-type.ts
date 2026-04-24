interface IScriptureStructureType {
    value?: ScriptureStructureType,
    label: string;
    displayText: string;
}

export enum ScriptureStructureType {

    /**
     * 권 > 품 > 게송
     * 대부분의 대승 경전
     * 예: 법화경 (28품), 화엄경 (39품/80권)
     */
    VolumeChapterVerse = 1,

    /**
     * 니까야 > 경 > 게송
     * 팔리 삼장 상좌부
     * 예: 법구경 (26품 423게송)
     */
    NikayaSuttaVerse = 2,

    /**
     * 단락 > 절
     * 단문 경전 (권·품 없이 바로 절로)
     * 예: 반야심경 (5단락 15절)
     */
    SectionVerse = 3,

    /**
     * 게송만
     * 단순 게송 모음
     */
    VerseOnly = 4,

    /**
     * 권 > 장 > 절
     * 논서류
     */
    VolumeChapterSection = 5,

    /**
     * 자유 형식
     */
    Freeform = 99
}

export const SCRIPTURE_STRUCTURE_TYPE_OPTIONS: IScriptureStructureType[] = [

    {
        value: ScriptureStructureType.VolumeChapterVerse,
        label: '권 ❈ 품 ❈ 게송',
        displayText: '권 ❈ 품 ❈ 게송'
    }, // 1.  예: 법화경 (28품), 화엄경 (39품/80권)

    {
        value: ScriptureStructureType.NikayaSuttaVerse,
        label: '니까야 ❈ 경 ❈ 게송',
        displayText: '니까야 ❈ 경 ❈ 게송'
    }, // 2. 예:  법구경 (26품 423게송)

    {
        value: ScriptureStructureType.SectionVerse,
        label: '단락 ❈ 절',
        displayText: '단락 ❈ 절'
    }, // 3. 예: 반야심경 (5단락 15절)

    {
        value: ScriptureStructureType.VerseOnly,
        label: '게송',
        displayText: '게송'
    }, // 4.

    {
        value: ScriptureStructureType.VolumeChapterSection,
        label: '권 ❈ 장 ❈ 절',
        displayText: '권 ❈ 장 ❈ 절'
    }, // 5.

    {
        value: ScriptureStructureType.Freeform,
        label: '자유형식',
        displayText: '자유형식'
    }, // 99.
];
