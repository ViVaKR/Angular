import { Validators } from "@angular/forms";
import { PinOrder } from "@app/core/enums/pin-order";
import { IFormConfig } from "@app/core/interfaces/i-form-config";

// * ScriptureMaster
export const SCRIPTURE_MASTER: IFormConfig = {
  fields: [

    // +  UserId
    { name: 'userId', defaultValue: '' },

    // + 한글 제목
    { name: 'title', defaultValue: '', validators: [Validators.required, Validators.maxLength(300)] },

    // + 원어 제목
    { name: 'chineseTitle', defaultValue: '', validators: [Validators.maxLength(300)] },
    { name: 'originalTitle', defaultValue: '', validators: [Validators.maxLength(300)] },
    // + 원문 원어 종류
    { name: 'originalLanguage', defaultValue: null, validators: [Validators.required] },
    // + 문자 체계
    { name: 'scriptType', defaultValue: null },
    // + 메인 카테고리
    { name: 'mainCategoryType', defaultValue: '', validators: [Validators.required] },
    // 불교 전통
    { name: 'tradition', defaultValue: null },
    // + 경전 성립시대/연대
    { name: 'period', defaultValue: '', validators: [Validators.maxLength(100)] },
    // 저자
    { name: 'author', defaultValue: '', validators: [Validators.maxLength(200)] },
    // 번역자
    { name: 'translator', defaultValue: '', validators: [Validators.maxLength(200)] },
    // 최초 번역시기
    { name: 'translationPeriod', defaultValue: '', validators: [Validators.maxLength(100)] },
    // 경전 구조 형식(게송, 품-절, 권-품-절, 경-절, 자유형식)
    { name: 'structureType', defaultValue: null },
    // 경전 구조 상세 (인간이 읽기 쉬운 형식)
    { name: 'structureDescription', defaultValue: '', validators: [Validators.maxLength(200)] },
    // 경전 분류
    { name: 'collection', defaultValue: null, validators: [Validators.required] },
    // 권 (number)
    { name: 'totalVolumes', defaultValue: null },
    // 품 (number)
    { name: 'totalChapters', defaultValue: null },
    // 경/절 (number)
    { name: 'totalSections', defaultValue: null },
    // 게송/문단 (number)
    { name: 'totalVerses', defaultValue: null },
    // 경전 난이도 (1 = 입문, 5 = 심화)
    { name: 'difficultyLevel', defaultValue: null, validators: [Validators.min(1), Validators.max(5)] },
    // 추천 순서 (전통 내)
    { name: 'recommendedOrder', defaultValue: null },
    // 예상 사경시간 (분)
    { name: 'estimatedMinutes', defaultValue: null },
    // 선수 경전 (이 경전을 읽기 전에 권장)
    { name: 'prerequisiteScriptureId', defaultValue: null },
    // 대표 이미지 URL
    { name: 'coverImageUrl', defaultValue: '', validators: [Validators.maxLength(500)] },
    // + 음성 낭독 URL
    { name: 'audioUrl', defaultValue: '', validators: [Validators.maxLength(500)] },
    // 약어
    { name: 'abbreviation', defaultValue: '' },
    // + 코멘트
    { name: 'memo', defaultValue: '' }
  ]
}

// * ScriptureParagraph
export const SCRIPTURE_PARAGRAPH: IFormConfig = {
  fields: [
    { name: 'title', defaultValue: '', validators: [Validators.required] },
    { name: 'scriptureMasterId', defaultValue: '', validators: [Validators.required] },
    { name: 'volume', defaultValue: null },
    { name: 'volumeTitle', defaultValue: '' },
    { name: 'chapter', defaultValue: null },
    { name: 'chapterTitle', defaultValue: '' },
    { name: 'section', defaultValue: null },
    { name: 'sectionTitle', defaultValue: '' },
    { name: 'verse', defaultValue: null },
    { name: 'verseTitle', defaultValue: '' },
    { name: 'sortOrder', defaultValue: null },
    { name: 'refCode', defaultValue: '' },
    { name: 'content', defaultValue: '', validators: [Validators.required] },
    { name: 'chineseContent', defaultValue: '' },
    { name: 'originalContent', defaultValue: '', validators: [Validators.required] },
    { name: 'commentary', defaultValue: '' },
    { name: 'keywords', defaultValue: '' }
  ]
}

// * ScriptureContent
export const SCRIPTURE_CONTENT: IFormConfig = {
  fields: [
    { name: 'title', defaultValue: '', validators: [Validators.required] },
    { name: 'scriptureMasterId', defaultValue: '', validators: [Validators.required] },
    { name: 'contentCategory', defaultValue: '', validators: [Validators.required] },
    { name: 'transcription', defaultValue: '', validators: [Validators.required] },
    { name: 'tags', defaultValue: '' },
    { name: 'postType', defaultValue: '', validators: [Validators.required] },
    { name: 'language', defaultValue: '', validators: [Validators.required] },
    { name: 'commentary', defaultValue: '' }
  ]
}


// * ScriptureContent
export const QNA: IFormConfig = {
  fields: [
    { name: 'title', defaultValue: '', validators: [Validators.required] },
    { name: 'content', defaultValue: '', validators: [Validators.required] },
    { name: 'pinOrder', defaultValue: PinOrder.NotFixed }
  ]
}


// * BuddhistTerm
export const BUDDHIST_TERM: IFormConfig = {
  fields: [
    { name: 'term', defaultValue: '', validators: [Validators.required] },
    { name: 'explanation', defaultValue: '', validators: [Validators.required] }
  ],
  formValidators: []
}

//  * TodaySutra
export const TODAYSUTRA: IFormConfig = {
  fields: [
    { name: 'title', defaultValue: '', validators: [Validators.required] },
    { name: 'sutra', defaultValue: '', validators: [Validators.required] }
  ],
  formValidators: []
}

//  * Role
export const ROLE_FORM_CONFIG: IFormConfig = {
  fields: [
    { name: 'name', defaultValue: '', validators: [Validators.required] },
    { name: 'description', defaultValue: '', validators: [Validators.required, Validators.maxLength(250)] }
  ],
  formValidators: []
}
