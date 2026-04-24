/**
 * 진리의 나툼 상세 항목
 */
export interface ManifestationItem {
  kind: 'video' | 'podcast' | 'holy_script' | 'brain_wave' | string;
  sang: 'video' | 'audio' | 'text' | '3d_mesh' | string;
  url: string;
  image?: string;
  label?: string;
  attributes?: Record<string, any>;
}

/**
 * [Schema] 모든 경전 데이터의 공통 인터페이스
 */
export interface ICanonSchema {
  subject: string;
  scriptureMajorCategoryId?: number;
  scriptureCategoryCode?: string;
  scriptureId: number;
  author?: string;
  translator?: string;
  latitude?: number;
  longitude?: number;
  details?: string;
  location?: string;
  manifestation: ManifestationItem[];
}

/**
 * [Entry] 신규 생성용
 */
export interface ICanonEntry extends ICanonSchema {
  pinOrder: number;
}

/**
 * [Patch] 부분 수정용
 */
export interface ICanonPatch extends ICanonSchema {
  id: number; // Patch는 ID가 필수입니다.
  pinOrder: number;
}

/**
 * [View] 서버로부터 수신하는 완성된 형태
 */
export interface ICanonView extends ICanonSchema {
  readonly id: number;
  readonly createdAt: Date | string;
  readonly modifiedAt?: Date | string;
  pinOrder: number;
  scriptureName?: string; // 참모총장이 제안한 자비로운 필드!
}
