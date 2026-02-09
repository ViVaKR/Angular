export const SEO_CONFIGS = {
  about: {
    title: '소개 - Buddham',
    description: 'Buddham은 불교 경전을 누구나 쉽게 접근하고 이해할 수 있도록 돕는 플랫폼입니다.',
    keywords: 'Buddham, 불교 경전, 소개, 불교, 경전, 해설, 플랫폼',
    url: 'https://buddham.co.kr/about'
  }
} as const;


export type SeoConfigKey = keyof typeof SEO_CONFIGS;
