export interface IMenuConfig {
  id: number;
  title: string;
  url: string;
  icon: string;
  exact?: boolean;
  isDivider?: boolean;

  // 추가 된 부분
  param?: string | null; // 라우터 파라미터
  disabled?: boolean; // 버튼 비활성화
  tooltip?: string; // 툴팁

  // ✨ 강력한 조건부 표시
  access?: {
    requiresAuth?: boolean; // 로그인 필요
    requiresEmailConfirmed?: boolean; // 이메일 인증 필요
    roles?: string[]; // 필요한 역할
    hideWhen?: {
      emailConfirmed?: boolean; // 이메일 인증시 숨김
      roles?: string[] // 특정 역할일 때 숨김
    };
  };

  // ✨ 뱃지 설정
  badge?: {
    show: () => boolean;
    text: string;
    color?: 'primary' | 'accent' | 'warn';
  };
}

// 🔥 선택 필드에 undefined 명시
export interface IMenuGroup {
  title: string;
  menus: IMenuConfig[];
  expanded?: boolean | undefined;
  icon?: string | undefined;
}
