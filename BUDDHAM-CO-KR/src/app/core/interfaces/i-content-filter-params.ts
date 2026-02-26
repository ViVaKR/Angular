import { ContentCategory } from "../enums/content-category";
import { PostType } from "../enums/post-type";

export interface IContentFilterParams {

    scriptureMasterId?: number;
    userId?: string;
    contentCategory?: ContentCategory;
    postType?: PostType;
    searchKeyword?: string;
    pageNumber?: number;
    pageSize?: number;
}
