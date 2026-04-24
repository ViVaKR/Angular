interface IScriptTypeOption {
    value: ScriptType,
    label: string;
    displayText: string;
}

export enum ScriptType {

    // * ===== 한국 =====

    /**
     * 한글
     */
    Hangul = 100,

    /**
     * 한자 단독
     */
    Hanja = 101,

    /**
     * 한글/한자 혼용
     */
    HangulHanja = 102,


    // * ===== 인도 북방 계열 (North Indic / Brahmic North) =====
    /**
     * 산스크리트, 힌디, 마라티, 네팔어
     */
    Devanagari = 200,

    /**
     * 실담 문자 (동아시아 밀교 범자)
     * 한국, 중국, 일본 진언/다라니 표기 핵심
     */
    Siddham = 201,

    /**
     * 란자나 문자 (네팔, 티베트 불교의례)
     */
    Ranjana = 202,

    /**
     * 샤라다 (카슈미르)
     * 고문헌용
     */
    Sharada = 203,

    /**
     * 구르무키 (펀자브)
     */
    Gurmukhi = 204,

    // ===== 인도 남방 계열 (South Indic / Brahmic South) =====

    /**
     * 싱할라 문자 (스리랑카)
     */
    Sinhala = 210,

    /**
     * 버마 문자 (미얀마)
     */
    Burmese = 211,

    /**
     * 태국 문자
     */
    Thai = 212,

    /**
     * 크메르 (캄보디아)
     */
    Khmer = 213,

    /**
     * 라오 문자
     */
    Lao = 214,

    /**
     * 그란타
     * 타밀, 말라얄람 산스크리트 표기
     */
    Grantha = 215,

    /**
     * 타밀
     * 남인도 불교 문헌
     */
    Tamil = 216,

    // ===== 티베트·중앙아시아 계열 =====

    /**
     * 티베트 문자
     */
    Tibetan = 300,

    /**
     * 몽골 전통 문자
     * 세로쓰기
     */
    Mongolian = 301,


    /**
     * 몽골 키릴 문자
     * 현대 몽골
     */
    MongolianCyrillic = 302,

    /**
     * 파스타 문자
     * 원나라 시대, 몽골 불교
     */
    Phags_pa = 303,

    // * ===== 동아시아 =====

    /**
     * 한자 번체
     */
    TraditionalChinese = 400,

    /**
     * 한자 간체
     */
    SimplifiedChinese = 401,


    /**
     * 일본 가나 단독
     */
    Kana = 410,

    /**
     * 일본 가나 한자혼용
     */
    Kanji = 411,

    // ===== 고대 / 학술 =====
    /**
     * 브라흐미 문자 (고대, 모든 문자의 조상)
     */
    Brahmi = 500,


    /**
     * 카로슈티 문자 (간다라, 우->좌 표기)
     */
    Kharosthi = 501,

    // ===== 전사/번역 =====

    /**
     * 로마자
     * IAST, ISO 등
     */
    Romanized = 600,

    /**
     * 팔리어 로마자 전사
     * PTS 표준
     */
    Pali_Roman = 601,               // 팔리어 로마자 전사 ← PTS 표준


    /**
     * 현대 한국어 번역본
     */
    Korean_Translation = 700,

    /**
     * 미분류
     */
    Unclassified = 999

}

export const SCRIPT_TYPE_OPTIONS: IScriptTypeOption[] = [

    // ===== 한국 =====

    { value: ScriptType.Hangul, label: '한글', displayText: 'Hangul (한글)' },
    { value: ScriptType.Hanja, label: '한자 단독', displayText: 'Hanja (한자 단독)' },
    { value: ScriptType.HangulHanja, label: '한글/한자 혼용', displayText: 'HangulHanja (한글/한자 혼용)' },

    //  ===== 인도 북방 계열 (North Indic / Brahmic North) =====

    { value: ScriptType.Devanagari, label: '데바나가리 (산스크리트, 힌디, 마라티, 네팔어)', displayText: 'Devanagari (산스크리트, 힌디, 마라티, 네팔어)' },
    { value: ScriptType.Siddham, label: '실담문자 (동아시아 밀교 범자)', displayText: 'Siddam (동아시나 밀교 범자 진언/다라니 표기)' },
    { value: ScriptType.Ranjana, label: '란자나 (네팔, 티베트 불교 의례)', displayText: 'Ranjana (네팔, 티베트 불교의례)' },
    { value: ScriptType.Sharada, label: '샤라다 (카슈미르)', displayText: 'Sharada (샤라다 캬슈미르)' },
    { value: ScriptType.Gurmukhi, label: '구르무키 (편자브)', displayText: 'Gurmukhi (구르무키 펀자브)' },

    // ===== 인도 남방 계열 (South Indic / Brahmic South) =====

    { value: ScriptType.Sinhala, label: '싱할라 (스리랑카)', displayText: 'Sinhala (싱할라문자, 스리랑카)' },
    { value: ScriptType.Burmese, label: '버마 (미얀마)', displayText: 'Burmese (버마문자, 미얀마)' },
    { value: ScriptType.Thai, label: '태국', displayText: 'Thai (태국문자)' },
    { value: ScriptType.Khmer, label: '크메르 (캄보디아)', displayText: 'Khmer (크메르문자, 캄보디아)' },
    { value: ScriptType.Lao, label: '라오', displayText: 'Lao (라오문자)' },
    { value: ScriptType.Grantha, label: '그란타 (타밀, 말라얄람 산스크리트 표기)', displayText: 'Grantha (타밀, 말라얄람 산스크리트 표기)' },
    { value: ScriptType.Tamil, label: '타밀 (남인도 불교 문헌)', displayText: 'Tamil (남인도 불교 문헌)' },

    // ===== 티베트·중앙아시아 계열 =====

    { value: ScriptType.Tibetan, label: '티베트', displayText: 'Tibetan (티베트문자)' },
    { value: ScriptType.Mongolian, label: '몽골 전통문자', displayText: 'Mongolian (몽골 전통문자)' },
    { value: ScriptType.MongolianCyrillic, label: '몽골 키릴문자', displayText: 'MongolianCyrillic (몽골 키릴문자)' },
    { value: ScriptType.Phags_pa, label: '파스타 문자', displayText: 'Phags_pa (파스타 문자)' },

    // ===== 동아시아 =====

    { value: ScriptType.TraditionalChinese, label: '한자 (번체)', displayText: 'TraditionalChinese (한자번체)' },
    { value: ScriptType.SimplifiedChinese, label: '한자 (간체)', displayText: 'SimplifiedChinese (한자간체)' },
    { value: ScriptType.Kana, label: '일본 가나 단독', displayText: 'Kana (일본 가나 단독)' },
    { value: ScriptType.Kanji, label: '일본 가나 한자혼용)', displayText: 'Kanji (일본 가나 한자혼용)' },


    // ===== 고대 / 학술 =====
    { value: ScriptType.Brahmi, label: '브라흐미 (고대)', displayText: 'Brahmi (브라흐미, 고대)' },
    { value: ScriptType.Kharosthi, label: '카로슈미 (간다라)', displayText: 'Kharosthi (가로슈티, 간다라)' },

    // ===== 전사/번역 =====

    { value: ScriptType.Romanized, label: '로마자', displayText: 'Romanized (로마자표기)' },
    { value: ScriptType.Pali_Roman, label: '팔리어 로마자 전사', displayText: 'Pali_Roman (팔리어 로마자 전사)' },
    { value: ScriptType.Korean_Translation, label: '현대 한국어 번역본', displayText: 'Korean_Translation (현대 한국어 번역본)' },

    // ==== 미분류 ====
    { value: ScriptType.Unclassified, label: '팔리어 로마자 전사', displayText: 'Pali_Roman (팔리어 로마자 전사)' },
]

