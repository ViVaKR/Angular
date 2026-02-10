import { PostType } from "@app/core/enums/post-type";
import { ContentCategory } from "@app/core/enums/content-category";

// * 사용자 생성 콘텐츠 (사경/번역/주석/자유글)
export interface IScriptureContent {
  id: number; // long
  scriptureMasterId: number; //long
  userId: string; // 작성자 ID
  authorPseudonum?: string // 필명
  title: string; // 제목
  content?: string; // 내용
  transcription: string; // 본문
  commentary?: string; // 메모
  constentCategory: ContentCategory; // 사경/번역/주석/자유글
  language: string; // 사경/번역 시 사용언어 (ko)
  tags?: string; // 태그 (CSV, JSON 문자열)
  postType: PostType; // 출판상태 (초안/검토/게시/숨김)
  likeCount: number; // 좋아요 수
  viewCount: number; // 조회 수
  isVerified: boolean; // 전문가 검증 여부 (사경 품질 관리용)
  createdAt: Date; // 생성일
  updatedAt?: Date; // 수정일
}
