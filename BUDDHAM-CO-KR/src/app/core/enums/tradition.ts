export enum BuddhistTradition {

  /**
   * 상좌부 불교  (Theravāda)
   * 팔리어 경전 전통
   * 스리랑카, 미얀마, 태국, 캄보디아, 라오스
   */
  Theravada = 1,

  /**
   * 대승 불교 (Mahāyāna)
   * 산스크리트/한문 경전 전통
   * 한국, 중국, 일본, 베트남
   */
  Mahayana = 2,

  /**
   * 금강승 불교 (Vajrayāna)
   * 티베트 경전 전통
   * 티베트, 부탄, 몽골, 네팔
   */
  Vajrayana = 3,

  /**
   * 전통 미분류
   * 여러 전통에 걸쳐 있거나 분류 불명확
   */
  Unclassified = 99
}

export interface TraditionOption {
  value: BuddhistTradition;
  label: string;
  displayText: string;
}

export const TRADITION_OPTIONS: TraditionOption[] = [
  { value: BuddhistTradition.Theravada, label: '상좌부', displayText: 'Theravada (상좌부)' },
  { value: BuddhistTradition.Mahayana, label: '대승', displayText: 'Mahayana (대승)' },
  { value: BuddhistTradition.Vajrayana, label: '금강승', displayText: 'Vajrayana (금강승)' },
  { value: BuddhistTradition.Unclassified, label: '미분류', displayText: 'Unclassified (미분류)' },

];
