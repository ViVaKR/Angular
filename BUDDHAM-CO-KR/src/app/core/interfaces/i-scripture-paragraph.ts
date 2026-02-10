import { MainCategoryType } from "@app/core/enums/main-category-type";

export interface IScriptureParagraph {
  id: number;
  mainCategoryType: MainCategoryType;
  scriptureMasterId: number;
  scriptureMasterTitle?: string;

  book?: string; // 권, 장/회
  bookTitle?: string;
  chapter?: string; // 품, 경
  chapterTitle?: string;
  section?: string; // 장
  sectionTitle?: string;
  passage?: string; // 절, 게송/분
  passageTitle?: string;

  originalContent: string; // 경전원문 내용
  content: string; // 경전번역 내용
}
