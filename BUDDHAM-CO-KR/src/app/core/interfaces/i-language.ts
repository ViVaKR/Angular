export interface ILanguage {

    code: string; // ISO 639-1 (2자리)
    name: string; // 원어 표기
    nameKo: string; // 한국어 표기
    countryCode?: string; // ISO 3166-1 (국가 코드)
    direction: 'ltr' | 'rtl'; // 텍스트 방향
}
