export enum MainCategoryType {

  EarlyBuddhism = 1, // 초기 불교 (팔리경전, 니가야 아함경 등)
  Sutra = 2, // 대승경전
  Vinaya = 3, // 율장 (규율)
  Abhidharma = 4, // 논장
  Commentary = 5, // 주석서
  Treatise = 6, // 논서 (용수, 무착)
  History = 7, // 불교사 / 전기
  DharmaTalk = 8, // 법문
  Practice = 9, // 수행 / 의식
  Culture = 10, // 문화 / 예술
  TBD = 99 // 미분류
}

export interface MainCategoryTypeOption {
  value: MainCategoryType,
  label: string;
  displayText: string;
}

export const MAINCATEGORY_OPTIONS: MainCategoryTypeOption[] = [
  { value: MainCategoryType.EarlyBuddhism, label: '초기 불교경전', displayText: '초기 불교경전 (Early Buddhism)' },
  { value: MainCategoryType.Sutra, label: '대승경전', displayText: '대승경전 (Sutra)' },
  { value: MainCategoryType.Vinaya, label: '율장/규율', displayText: '율장/규율 (Vinaya )' },
  { value: MainCategoryType.Abhidharma, label: '논장', displayText: '논장 (Abhidharma)' },
  { value: MainCategoryType.Commentary, label: '주석서', displayText: '주석서 (Commentary)' },
  { value: MainCategoryType.Treatise, label: '논서', displayText: '논서 (Treatise )' },
  { value: MainCategoryType.History, label: '불교사', displayText: '불교사 ( History)' },
  { value: MainCategoryType.DharmaTalk, label: '법문', displayText: '법문 (Treatise)' },
  { value: MainCategoryType.Practice, label: '수행/의식', displayText: '수행/의식 (Practice )' },
  { value: MainCategoryType.Culture, label: '문화/예술', displayText: '문화/예술 (Culture )' },
  { value: MainCategoryType.TBD, label: '미분류', displayText: '미분류 (Treatise )' },
]
