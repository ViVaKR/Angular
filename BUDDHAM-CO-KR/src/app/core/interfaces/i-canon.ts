import { MainCategoryType } from "@app/core/enums/main-category-type";
import { OriginalLanguage } from "@app/core/enums/original-language";
import { BuddhistTradition } from "@app/core/enums/tradition";

export interface ICanonBase {
    id: number;
    userId?: string;
    title: string;
    chineseTitle?: string;
    originalTitle?: string;
    originalLanguage: OriginalLanguage;
    category: MainCategoryType;
    tradition?: BuddhistTradition;
    author?: string;
    translator?: string;
    period?: string;
    translationPeriod?: string;
    structureDescription?: string;
    volumes?: number;
    chapters?: number;
    section?: number;
    verses?: number;
    coverImageUrl?: string;
    audioUrl?: string;
    abbreviation?: string;
    memo?: string;
}
export interface ICanon extends ICanonBase {
    replyCount?: number;
}

export interface ICanonCreateOrUpdate {
    id?: number;
    title: string;
    chineseTitle: string;
    originalTitle: string;
    originalLanguage: OriginalLanguage;
    category: MainCategoryType;
    tradition?: BuddhistTradition;
    author?: string;
    translator?: string;
    period?: string;
    translationPeriod?: string;
    structureDescription?: string;
    volumes?: number;
    chapters?: number;
    section?: number;
    verses?: number;
    coverImageUrl?: string;
    audioUrl?: string;
    abbreviation?: string;

    memo?: string;
}

