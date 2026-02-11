interface IScriptureStructureType {
    value: ScriptureStructureType,
    label: string;
    displayText: string;
}

export enum ScriptureStructureType {

    /**
     * 게송 (verse/gāthā)
     * 예: 법구경, 숫타니파타
     */
    Verse = 1,

    /**
     * 품-절 (chapter-section)
     * 예: 금강경, 반야심경
     */
    ChapterSection = 2,

    /**
     * 권-품-절 (volume-chapter-section)
     * 예: 법화경, 화엄경
     */
    VolumeChapterSection = 3,

    /**
     * 경-절 (sutta-verse)
     * 예: 니까야류
     */
    SuttaVerse = 4,

    /**
     * 자유 형식
     */
    Freeform = 99
}

export const SCRIPTURE_STRUCTURE_TYPE_OPTIONS: IScriptureStructureType[] = [
    { value: ScriptureStructureType.Verse, label: '게송', displayText: '게송 (verse/gāthā)' },
    { value: ScriptureStructureType.ChapterSection, label: '품-절', displayText: '품-절 (chapter-section)' },
    { value: ScriptureStructureType.VolumeChapterSection, label: '권-품-절', displayText: '권-품-절 (volume-chapter-section)' },
    { value: ScriptureStructureType.SuttaVerse, label: '경-절', displayText: '경-절 (sutta-verse)' },
    { value: ScriptureStructureType.Freeform, label: '자유 형식', displayText: '자유 형식' },
];
