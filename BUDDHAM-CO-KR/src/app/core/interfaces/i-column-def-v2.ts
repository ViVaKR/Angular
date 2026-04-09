/**
 * 4,000년 대계: 신형 컬럼 정의 인터페이스 (V2)
 * 데이터의 본질과 시각적 나툼을 엄격히 분리합니다.
 */
export interface IColumnDefV2 {
  // 1. 본질 (The Essence)
  readonly key: string;      // DB 필드명
  readonly label: string;    // 사용자에게 보여줄 이름

  // 2. 가시성 (The Visibility) - 어디서 보여줄 것인가?
  readonly display: {
    readonly table?: boolean;     // 메인 리스트 테이블
    readonly tab?: boolean;       // 상세 정보 탭
    readonly mobile?: boolean;    // 모바일 전용 뷰 (복선!)
    readonly position?: 'header' | 'sub-header' | 'badge' | 'content' | 'footer';
    readonly order?: number;      // 정렬 순서
  };

  // 3. 변형 (The Transformation) - 어떻게 가공할 것인가?
  readonly format?: {
    readonly pipe: 'date' | 'enum' | 'truncate' | 'location' | 'scripture-link' | 'html';
    readonly args?: any;
    readonly unit?: string;
    readonly font?: 'font-noto' | 'font-hanmun' | 'font-ibm' | 'font-cute';
  };

  // 4. 메타데이터 (The Metadata) - 사령관님의 특수 목적용
  readonly meta?: {
    readonly placeholder?: string;
    readonly helpText?: string;   // 툴팁 등에 사용
    readonly isPrivate?: boolean; // 보안 필터링용
  };
}
