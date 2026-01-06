export interface IMenuConfig {
  id: number;
  title: string;
  url: string;
  icon: string;
  exact?: boolean;

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
