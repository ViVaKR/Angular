import { MainCategoryType } from "../enums/main-category-type";
import { OriginalLanguage } from "../enums/original-language";
import { ScriptType } from "../enums/script-type";
import { ScriptureCollection } from "../enums/scripture-collection";
import { ScriptureStructureType } from "../enums/scripture-structure-type";
import { BuddhistTradition } from "../enums/tradition";

export interface IScriptureMasterCreate {
  title: string; // 제목
  chineseTitle?: string; // 한문 제목
  originalTitle?: string; // 원전 제목
  originalLanguage?: OriginalLanguage | null; // 원전 원어
  scriptType?: ScriptType | null; // 문자 체계
  mainCategoryType?: MainCategoryType; // 메인 카테고리
  tradition?: BuddhistTradition | null; // 테라바다 초기불교, 마하야나 대승불교, 바즈라야나 티베트 불교 금강승
  period?: string; // 시대, 기원전 5세기, 1세기경
  author?: string; // 저자
  translator?: string; // 번역
  translationPeriod?: string; // 번역 시대 구마라습 402년 번역 등
  structureType?: ScriptureStructureType; // 책구성
  structureDescription?: string; // 구조 설명 (인간이 읽기 쉬운 형식)
  collection: ScriptureCollection; // 경전 분류 (니까야/부)
  totalVolumes?: number; // 권
  totalChapters?: number; // 품
  totalSections?: number; // 경/절
  totalVerses?: number; // 게송/문단
  difficultyLevel?: number; // 경전 난이도 (1 = 입문, 5 = 심화)
  recommendedOrder?: number; // 추천 순서
  estimatedMinutes?: number; // 예상 사경시간 (분)
  prerequisiteScriptureId: number | null; // 선수 경전 (이 경전을 읽기 전에 권장)
  coverImageUrl?: string; // 대표 이미지 URL
  audioUrl?: string; // 음성 낭독 URL (팔리어 발음 가이드)
  abbreviation?: string; // 약어
  memo?: string;
}
