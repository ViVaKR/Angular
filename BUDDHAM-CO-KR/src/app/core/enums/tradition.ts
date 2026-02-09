export enum BuddhistTradition {
  Theravada = 'Theravada', // 상좌부 불교
  Mahayana = 'Mahayana', // 대승 불교
  Vajrayana = 'Vajrayana' // 금강승, 티베트 불교
}

export interface TraditionOption {
  value: BuddhistTradition;
  label: string;
  displayText: string;
}

export const TRADITION_OPTIONS: TraditionOption[] = [
  { value: BuddhistTradition.Theravada, label: '상좌부', displayText: 'Theravada (상좌부)' },
  { value: BuddhistTradition.Mahayana, label: '대승', displayText: 'Mahayana (대승)' },
  { value: BuddhistTradition.Vajrayana, label: '금강승', displayText: 'Vajrayana (금강승)' }
];
