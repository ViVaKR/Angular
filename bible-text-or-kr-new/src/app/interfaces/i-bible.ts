import { ICategory } from "./i-category";

export interface IBible {
    id: number;
    title: string; //! 추가
    categoryId: number; //! 추가
    chapter: number; //! 추가
    verse: number; //! 추가
    textKor: string; //! 추가
    textEng: string; //! 추가
    comments: string; //! 추가
    created: Date;
    modified: Date;
    userId: string;
    userName: string;
    myIp: string;
    category?: ICategory | null | undefined;
}

/*
    --> id, categoryId, chapter, verse, textKor, textEng, note, comments, category
*/
