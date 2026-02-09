import { OriginalLanguage } from "@app/core/enums/original-language";
import { BuddhistTradition } from "@app/core/enums/tradition";

export interface IScriptureMasterRead {
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
