import { Validators } from "@angular/forms";
import { IFormConfig } from "@app/core/interfaces/i-form-config";

// * ScriptureMaster
export const SCRIPTURE_MASTER: IFormConfig = {
  fields: [
    { name: 'title', defaultValue: '', validators: [Validators.required] },
    { name: 'originalTitle', defaultValue: '', validators: [Validators.required] },
    { name: 'originalLanguage', defaultValue: '' },
    { name: 'tradition', defaultValue: '' },
    { name: 'period', defaultValue: '' },
    { name: 'author', defaultValue: '' },
    { name: 'translator', defaultValue: '' },
    { name: 'translationPeriod', defaultValue: '' },
    { name: 'structure', defaultValue: '' },
    { name: 'collection', defaultValue: '' },
    { name: 'recommendedOrder', defaultValue: 0 },
    { name: 'coverImageUrl', defaultValue: '' },
    { name: 'audioUrl', defaultValue: '' },
    { name: 'totalVerses', defaultValue: 0 },
    { name: 'estimatedMinutes', defaultValue: 0 },
    { name: 'memo', defaultValue: '' }
  ]
}

// * ScriptureParagraph
export const SCRIPTURE_PARAGRAPH: IFormConfig = {
  fields: [
    { name: 'mainCategoryType', defaultValue: '', validators: [Validators.required] },
    { name: 'scriptureMasterId', defaultValue: '', validators: [Validators.required] },
    { name: 'book', defaultValue: '' },
    { name: 'bookTitle', defaultValue: '' },
    { name: 'chapter', defaultValue: '' },
    { name: 'chapterTitle', defaultValue: '' },
    { name: 'section', defaultValue: '' },
    { name: 'sectionTitle', defaultValue: '' },
    { name: 'passage', defaultValue: '' },
    { name: 'passageTitle', defaultValue: '' },
    { name: 'content', defaultValue: '', validators: [Validators.required] },
    { name: 'originalContent', defaultValue: '', validators: [Validators.required] }
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
