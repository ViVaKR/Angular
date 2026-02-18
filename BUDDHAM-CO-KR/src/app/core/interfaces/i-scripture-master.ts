import { OriginalLanguage } from "@app/core/enums/original-language";
import { BuddhistTradition } from "@app/core/enums/tradition";
import { ScriptType } from "../enums/script-type";
import { ScriptureStructureType } from "@app/core/enums/scripture-structure-type";
import { ScriptureCollection } from "@app/core/enums/scripture-collection";

export interface IScriptureMaster {

  id: number;

  // * ===== 기본 정보 =====
  title: string; // 한글 제목
  originalTitle?: string; // 원전 제목

  // * ===== 언어·문자 =====
  originalLanguage?: OriginalLanguage | null; // 원전 언어
  scriptType?: ScriptType | null; // 문자 체계

  // * ===== 분류 =====
  tradition?: BuddhistTradition | null; // 불교 전통
  collection: ScriptureCollection; // 경전 구성

  // * ===== 저작 정보 =====
  author?: string; // 저자
  translator?: string; // 역자
  period?: string; // 경전 성립시기
  translationPeriod?: string; // 번역 시기

  // * ===== 구조 정보 =====
  structureType?: ScriptureStructureType; // 구성 단위 유형
  structureDescription?: string; // 구성 상세 설명 (인간이 읽기 쉬운 형식)
  totalVolumes?: number; // 권
  totalChapters?: number; // 품
  totalSections?: number; // 장/편/부
  totalVerses?: number; // 게송/문단/절

  // * ===== 학습 정보 =====
  difficultyLevel?: number; // 경전 난이도 (1 = 입문, 5 = 심화)
  recommendedOrder?: number; // 추천 순서
  estimatedMinutes?: number; // 예상 사경시간 (분)
  prerequisiteScriptureId: number | null; // 선수 경전 ID

  // ===== 미디어 =====
  coverImageUrl?: string; // 커버 이미지
  audioUrl?: string; // 음성 낭독

  // * ==== 기타 ====
  memo?: string; // 메모
}
