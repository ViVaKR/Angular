import { OriginalLanguage } from "@app/core/enums/original-language";
import { BuddhistTradition } from "@app/core/enums/tradition";

export interface IScriptureMaster {
  id: number;
  title: string;
  originalTitle?: string; // 원전 제목
  originalLanguage?: OriginalLanguage | null; // 원전 원어
  tradition?: BuddhistTradition | null; // 테라바다 초기불교, 마하야나 대승불교, 바즈라야나 티베트 불교 금강승
  period?: string; // 시대, 기원전 5세기, 1세기경
  author?: string; // 저자
  translator?: string; // 번역
  translationPeriod?: string; // 번역 시대 구마라습 402년 번역 등
  structure?: string; // 책구성
  recommendedOrder?: number; // 추천 순서
  coverImageUrl?: string; // 대표 이미지 URL
  audioUrl?: string; // 음성 낭독 URL (팔리어 발음 가이드)
  collection?: string; // 경전 분류 (아함/대승)
  totalVerses?: number;  // 총 게송/절 수
  estimatedMinutes?: number; // 예상 사경시간 (분)
  memo?: string;
}

/*
  1. 테라바다 (Theravada)
  뜻: "어른들의 가르침" 또는 "상좌부 불교".
  특징: 초기 불교 경전(팔리어 경전)을 중심으로 하며, 개인의 해탈(아라한)을 목표로 수행합니다. 주로 스리랑카, 태국, 미얀마 등 동남아시아에서 주로 믿습니다.
  2. 마하야나 (Mahayana)
  뜻: "큰 수레" 또는 "대승 불교".
  특징: 모든 중생의 구제를 위해 보살이 되어 깨달음을 이루는 '보살행'을 강조합니다. 중국, 한국, 일본 등 동아시아에서 널리 퍼졌으며, 다양한 종파가 있습니다.
  3. 바즈라야나 (Vajrayana)
  뜻: "금강 수레" 또는 "금강승(金剛乘)".
  특징: 마하야나의 한 갈래로, 만트라, 만달라, 탄트라 등 밀교적 기법을 사용하여 더 빠르고 강력하게 깨달음을 얻는 것을 목표로 합니다. 티베트 불교가 대표적입니다.
*/
