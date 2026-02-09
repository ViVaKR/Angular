import { PostType } from "@app/core/enums/post-type";
import { ContentCategory } from "@app/core/enums/content-category";

export interface IScriptureContentCreate {
    title: string; // 제목, 200
    scriptureMasterId: number; //long
    contentCategory: ContentCategory; // 타입 (사경/번역/주석/자유글)
    transcription: string; // 본문
    tags?: string; // 태그 (CSV, JSON 문자열), 500
    postType: PostType; // 출판상태 (초안/검토/게시/숨김)
    language: string; // 사경/번역 시 사용언어 (ko)
    commentary?: string; // 메모
}
