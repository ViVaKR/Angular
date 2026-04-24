import { IScriptureMasterRead } from "./i-scripture-master-read";

export interface IScriptureParagraphRead {

    id: number;
    title?: string;
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
    chineseContent?: string;
    originalContent: string;
    master?: IScriptureMasterRead;
}
