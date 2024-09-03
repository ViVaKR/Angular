import { ICategory } from "./i-category";

export interface IBible {
    id: number;
    categoryId: number;
    chapter: number;
    verse: number;
    textKor: string;
    textEng: string;
    note: string;
    comments: string;
    category?: ICategory | null | undefined;
}


/*
    --> id, categoryId, chapter, verse, textKor, textEng, note, comments, category
*/
