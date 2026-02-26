export enum DocumentType {

    /**
     * 법문 - 스님의 설법
     * 법회나 특별한 날에 하시는 말씀
     */
    Sermon = 101,

    /**
     * 법담 - 스님과의 대화
     * 일상적인 질문과 답변, 현실적인 조언
     */
    DharmaTalk = 102,

    /**
     * 경전강의 - 불경 해설
     * 금강경, 법화경 등을 자세히 풀어서 설명
     */
    Lecture = 103,

    /**
     * 화두 - 참선 지도
     * 선방에서 주는 화두와 깨달음의 길잡이
     */
    ZenTeaching = 104,

    /**
     * 자유글
     */
    FreeText = 901
}

// constants/document-labels.ts
export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
    [DocumentType.Sermon]: '법문',
    [DocumentType.DharmaTalk]: '법담',
    [DocumentType.Lecture]: '경전강의',
    [DocumentType.ZenTeaching]: '화두',
    [DocumentType.FreeText]: '자유글'
};

// 상세 설명이 필요한 경우
export const DOCUMENT_TYPE_DESCRIPTIONS: Record<DocumentType, string> = {
    [DocumentType.Sermon]: '스님의 설법 (법회, 특별 법문)',
    [DocumentType.DharmaTalk]: '스님과의 대화 (질의응답, 실용 가르침)',
    [DocumentType.Lecture]: '경전 강의 (금강경, 법화경 등 해설)',
    [DocumentType.ZenTeaching]: '화두 제시 (참선 지도)',
    [DocumentType.FreeText]: '자유로운 글 또는 법문'
};

// 짧은 설명 (툴팁용)
export const DOCUMENT_TYPE_TOOLTIPS: Record<DocumentType, string> = {
    [DocumentType.Sermon]: '법회나 특별한 날의 설법',
    [DocumentType.DharmaTalk]: '일상의 질문에 대한 답변',
    [DocumentType.Lecture]: '불경을 자세히 풀어 설명',
    [DocumentType.ZenTeaching]: '참선 수행을 위한 지도',
    [DocumentType.FreeText]: '자유로운 글'
};

export interface DocumentTypeOption {
    value: DocumentType;
    displayText: string;
    toolTips?: string;
}

export const DOCUMENTTYPE_OPTIONS: DocumentTypeOption[] = [
    { value: DocumentType.Sermon, displayText: 'Sermon (법회 설법)', toolTips: '법문, 특별법문 스님의 설법' },
    { value: DocumentType.DharmaTalk, displayText: 'DharmaTalk (법담)', toolTips: '스님과의 대화 (질의응답)' },
    { value: DocumentType.Lecture, displayText: 'Lecture (경전강의)', toolTips: '불교경전의 상세한 설명' },
    { value: DocumentType.ZenTeaching, displayText: 'ZenTeaching (화두)', toolTips: '참선수행을 위한 화두' },
    { value: DocumentType.FreeText, displayText: 'FreeText (자유글쓰기)', toolTips: '자유로운 글, 법문' },
]
