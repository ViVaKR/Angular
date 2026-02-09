import { ILanguage } from "@app/core/interfaces/i-language";

export const SUPPORTED_LANGUAGES: ILanguage[] = [
    // 동아시아
    { code: 'ko', name: '한국어', nameKo: '한국어', countryCode: 'KR', direction: 'ltr' },
    { code: 'ja', name: '日本語', nameKo: '일본어', countryCode: 'JP', direction: 'ltr' },
    { code: 'zh', name: '中文', nameKo: '중국어 (간체)', countryCode: 'CN', direction: 'ltr' },
    { code: 'zh-TW', name: '繁體中文', nameKo: '중국어 (번체)', countryCode: 'TW', direction: 'ltr' },

    // 남아시아 (불교 경전 주요 언어)
    { code: 'sa', name: 'संस्कृतम्', nameKo: '산스크리트어', countryCode: 'IN', direction: 'ltr' },
    { code: 'pi', name: 'पालि', nameKo: '팔리어', countryCode: 'IN', direction: 'ltr' },
    { code: 'hi', name: 'हिन्दी', nameKo: '힌디어', countryCode: 'IN', direction: 'ltr' },
    { code: 'ne', name: 'नेपाली', nameKo: '네팔어', countryCode: 'NP', direction: 'ltr' },
    { code: 'bo', name: 'བོད་ཡིག', nameKo: '티베트어', countryCode: 'CN', direction: 'ltr' },
    { code: 'my', name: 'မြန်မာဘာသာ', nameKo: '미얀마어', countryCode: 'MM', direction: 'ltr' },
    { code: 'th', name: 'ไทย', nameKo: '태국어', countryCode: 'TH', direction: 'ltr' },
    { code: 'km', name: 'ខ្មែរ', nameKo: '크메르어', countryCode: 'KH', direction: 'ltr' },
    { code: 'lo', name: 'ລາວ', nameKo: '라오어', countryCode: 'LA', direction: 'ltr' },
    { code: 'si', name: 'සිංහල', nameKo: '싱할라어', countryCode: 'LK', direction: 'ltr' },

    // 동남아시아
    { code: 'vi', name: 'Tiếng Việt', nameKo: '베트남어', countryCode: 'VN', direction: 'ltr' },
    { code: 'id', name: 'Bahasa Indonesia', nameKo: '인도네시아어', countryCode: 'ID', direction: 'ltr' },

    // 서양 주요 언어
    { code: 'en', name: 'English', nameKo: '영어', countryCode: 'US', direction: 'ltr' },
    { code: 'es', name: 'Español', nameKo: '스페인어', countryCode: 'ES', direction: 'ltr' },
    { code: 'fr', name: 'Français', nameKo: '프랑스어', countryCode: 'FR', direction: 'ltr' },
    { code: 'de', name: 'Deutsch', nameKo: '독일어', countryCode: 'DE', direction: 'ltr' },
    { code: 'it', name: 'Italiano', nameKo: '이탈리아어', countryCode: 'IT', direction: 'ltr' },
    { code: 'pt', name: 'Português', nameKo: '포르투갈어', countryCode: 'PT', direction: 'ltr' },
    { code: 'ru', name: 'Русский', nameKo: '러시아어', countryCode: 'RU', direction: 'ltr' },
    { code: 'pl', name: 'Polski', nameKo: '폴란드어', countryCode: 'PL', direction: 'ltr' },

    // 중동 (RTL 언어)
    { code: 'ar', name: 'العربية', nameKo: '아랍어', countryCode: 'SA', direction: 'rtl' },
    { code: 'he', name: 'עברית', nameKo: '히브리어', countryCode: 'IL', direction: 'rtl' },
    { code: 'fa', name: 'فارسی', nameKo: '페르시아어', countryCode: 'IR', direction: 'rtl' },

    // 기타
    { code: 'tr', name: 'Türkçe', nameKo: '터키어', countryCode: 'TR', direction: 'ltr' },
    { code: 'nl', name: 'Nederlands', nameKo: '네덜란드어', countryCode: 'NL', direction: 'ltr' },
    { code: 'sv', name: 'Svenska', nameKo: '스웨덴어', countryCode: 'SE', direction: 'ltr' },
];

// 언어 코드로 검색하는 헬퍼 함수
export function getLanguageByCode(code: string): ILanguage | undefined {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
}

// Select 옵션용 배열 생성
export function getLanguageOptions() {
    return SUPPORTED_LANGUAGES.map(lang => ({
        value: lang.code,
        displayText: `${lang.name} (${lang.nameKo})`
    }));
}
