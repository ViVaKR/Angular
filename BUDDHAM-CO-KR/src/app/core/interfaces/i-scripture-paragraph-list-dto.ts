import { MainCategoryType } from "@app/core/enums/main-category-type";
import { OriginalLanguage } from "../enums/original-language";
import { ScriptType } from "../enums/script-type";
import { BuddhistTradition } from "../enums/tradition";
import { ScriptureStructureType } from "../enums/scripture-structure-type";
import { ScriptureCollection } from "../enums/scripture-collection";

/**
 * 경전 단락 목록 DTO
 * C# DTO와 1:1 매핑 (camelCase 변환)
 */
export interface IScriptureParagraphListDTO {
    // 기본 필드들
    id: number;
    title?: string;
    scriptureMasterId: number;
    mainCategoryType: MainCategoryType;
    volume: number | null;
    volumeTitle: string | null;
    chapter: number | null;
    chapterTitle: string | null;
    section: number | null;
    sectionTitle: string | null;
    verse: number | null;
    verseTitle: string | null;
    sortOrder: number;
    refCode: string | null;
    content: string | null;
    chineseContent: string | null;
    originalContent: string | null;
    commentary: string | null;
    keywords: string | null;

    // Master 필드들 (Flat 구조)
    masterTitle: string | null;
    masterChineseTitle: string | null;
    masterOriginalTitle: string | null;
    masterOriginalLanguage: OriginalLanguage;
    masterScriptType: ScriptType | null;
    masterTradition: BuddhistTradition | null;
    masterPeriod: string | null;
    masterAuthor: string | null;
    masterTranslator: string | null;
    masterTranslationPeriod: string | null;
    masterStructureType: ScriptureStructureType | null;
    masterCollection: ScriptureCollection | null;
    masterTotalVolumes: number | null;
    masterTotalChapters: number | null;
    masterTotalSections: number | null;
    masterDifficultyLevel: number | null;
    masterRecommendedOrder: number | null;
    masterEstimatedMinutes: number | null;
    masterPrerequisiteScriptureId: number | null;
    masterCoverImageUrl: string | null;
    masterAudioUrl: string | null;
    masterAbbreviation: string | null;
    masterMemo: string | null;
}
