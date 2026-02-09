import { ContentCategory } from "../enums/content-category";
import { PostType } from "../enums/post-type";

export interface IScriptureContentRead {
    id: number; // long
    title: string; // 제목
    scriptureMasterId: number;
    scriptureMasterTitle?: string
    userId: string; // 작성자 ID
    authorPseudonym?: string // 필명
    contentCategory: ContentCategory; // 사경/번역/주석/자유글
    transcription: string; // 본문
    tags?: string; // 태그 (CSV, JSON 문자열)
    likeCount: number; // 좋아요 수
    viewCount: number; // 조회 수
    postType: PostType; // 출판상태 (초안/검토/게시/숨김)
    createdAt: Date; // 생성일
    updatedAt?: Date; // 수정일
    language: string; // 사경/번역 시 사용언어 (ko)
    isVerified: boolean; // 전문가 검증 여부 (사경 품질 관리용)
    commentary?: string; // 메모
}
