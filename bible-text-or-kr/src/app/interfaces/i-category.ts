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
