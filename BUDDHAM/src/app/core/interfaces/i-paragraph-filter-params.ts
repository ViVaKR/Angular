import { MainCategoryType } from "../enums/main-category-type";

export interface IParagraphFilterParams {
    scriptureMasterId?: number;
    mainCategoryType?: MainCategoryType;
    searchKeyword?: string;
    pageNumber?: number;
    pageSize?: number;
}
