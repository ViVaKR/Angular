import { ILanguageOption } from "../interfaces/i-language-option";

interface IScriptTypeOption {
    value: ScriptType,
    label: string;
    displayText: string;
}

export enum ScriptType {

    /**
     * 한글
     */
    Hangul,

    /**
     * 한글 (한자 혼용)
     */
    Hanja,

    // ===== 인도 계열 =====

    /**
     * 싱할라 문자 (스리랑카)
     */
    Sinhala,

    /**
     * 버마 문자 (미얀마)
     */
    Burmese,

    /**
     * 태국 문자
     */
    Thai,

    /**
     * 크메르 문자 (캄보디아)
     */
    Khmer,

    /**
     * 라오 문자
     */
    Lao,

    /**
     * 데바나가리 (힌디/산스크리트)
     */
    Devanagari,

    /**
     * 란자나 문자 (네팔)
     */
    Ranjana,

    // ===== 티베트 계열 =====

    /**
     * 티베트 문자
     */
    Tibetan,

    /**
     * 몽골 문자
     */
    Mongolian,

    // ===== 동아시아 =====

    /**
     * 한자 (번체)
     */
    TraditionalChinese,

    /**
     * 한자 (간체)
     */
    SimplifiedChinese,


    /**
     * 가나 (일본)
     */
    Kana,

    /**
     * 가나 (한자 혼용)
     */
    Kanji,

    // ===== 기타 =====

    /**
     * 로마자 표기
     */
    Romanized,

    /**
     * 브라흐미 문자 (고대)
     */
    Brahmi,

    /**
     * 카로슈티 문자 (간다라)
     */
    Kharosthi
}


export const SCRIPT_TYPE_OPTIONS: IScriptTypeOption[] = [
    { value: ScriptType.Hangul, label: '한글', displayText: 'Hangul (한글)' },
    { value: ScriptType.Hanja, label: '한글 (한자 혼용)', displayText: 'Hanja (한글 한자혼용)' },
    { value: ScriptType.Sinhala, label: '싱할라 (스리랑카)', displayText: 'Sinhala (싱할라 스리랑카)' },
    { value: ScriptType.Burmese, label: '버마 (미얀마)', displayText: 'Burmese (버마 미얀마)' },
    { value: ScriptType.Thai, label: '태국', displayText: 'Thai (태국)' },
    { value: ScriptType.Khmer, label: '크메르 (캄보디아)', displayText: 'Khmer (크메르 캄보디아)' },
    { value: ScriptType.Lao, label: '라오', displayText: 'Lao (라오)' },
    { value: ScriptType.Devanagari, label: '데바나가리 (힌디/산스크리트)', displayText: 'Devanagari (힌디/산스크리트)' },
    { value: ScriptType.Ranjana, label: '란자나 (네팔)', displayText: 'Ranjana (네팔)' },
    { value: ScriptType.Tibetan, label: '티베트 ', displayText: 'Tibetan (티베트)' },
    { value: ScriptType.Mongolian, label: '몽골 ', displayText: 'Mongolian (몽골)' },
    { value: ScriptType.TraditionalChinese, label: '한자 (번체)', displayText: 'TraditionalChinese (번체)' },
    { value: ScriptType.SimplifiedChinese, label: '한자 (간체)', displayText: 'SimplifiedChinese (간체)' },
    { value: ScriptType.Kana, label: '일본 (가나)', displayText: 'Kana (일본 가나)' },
    { value: ScriptType.Kanji, label: '일본 (한자혼용)', displayText: 'Kanji (일본 한자혼용)' },
    { value: ScriptType.Romanized, label: '로마자', displayText: 'Romanized (로마자)' },
    { value: ScriptType.Brahmi, label: '브라흐미 (고대)', displayText: 'Brahmi (브라흐미 고대)' },
    { value: ScriptType.Kharosthi, label: '카로슈미 (간다라)', displayText: 'Kharosthi (가로슈티 간다라)' }
]

