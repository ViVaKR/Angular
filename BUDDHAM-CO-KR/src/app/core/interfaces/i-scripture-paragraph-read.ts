import { MainCategoryType } from "../enums/main-category-type";
import { IScriptureMasterRead } from "./i-scripture-master-read";

export interface IScriptureParagraphRead {

    id: number;
    mainCategoryType: MainCategoryType;
    scriptureMasterId: number;
    book?: string;
    bookTitle?: string;
    chapter?: string;
    chapterTitle?: string;
    section?: string;
    sectionTitle?: string;
    passage?: string;
    passageTitle?: string;
    content: string;
    originalContent: string;
    master?: IScriptureMasterRead;
}


/*
// --> master
    title: string;
    originalTitle: string;
    originalLanguage: string;
    tradition: string;
    period: string;
    author: string;
    translator: string;
    translationPeriod: string;
    structure: string;
    memo: string;

*/
