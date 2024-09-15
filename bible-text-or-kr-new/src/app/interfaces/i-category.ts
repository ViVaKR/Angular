import { Testament } from "@app/types/testament";

export interface ICategory {
    id: number;
    testament: Testament;
    engName: string;
    korName: string;
    engAbbreviation: string;
    korAbbreviation: string;
    chapterCount: number;
    verseCount: number;
    order: number;
    description: string;
}


/*

--> "id","testament","eng_name","kor_name","eng_abbreviation","kor_abbreviation","chapter_count","verse_count","order","description"
*/
