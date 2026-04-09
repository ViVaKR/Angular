/** 숫자 판독기 */
export function tryParseInt(value: string | null | undefined): [boolean, number] {
  if (!value) return [false, 0];
  const result = parseInt(value, 10);
  return [!isNaN(result), isNaN(result) ? 0 : result];
}

/** 퍼센트 계산기 */
export function toPercent(value: number, total: number): number {
  return (value / total) * 100;
}



// 파일명.util.ts 또는 파일명.helper.ts라고 명명하여, 파일 목록만 봐도
// "아, 여기는 도구함이구나!"라고 알 수 있게 군기를 잡으십시오.
