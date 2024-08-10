import { ICategory } from "./i-category";

export interface ICode {
    id: number;
    title: string;
    content: string;
    created: Date;
    note: string;
    appUserId: string;
    categoryId: number;
}
