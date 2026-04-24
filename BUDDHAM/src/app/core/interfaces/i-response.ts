import { RsCode } from "@app/core/enums/rs-code";

export interface IResponse<T = any> {
  rsCode: RsCode;
  rsMessage: string;
  rsData?: T;
  timestamp?: string; // DateTime 은 ISO string으로 전달 됨
}

// 타입 가드 - 제너릭 응답인지 확인
export function isTypedResponse<T>(response: IResponse): response is IResponse<T> {
  return response.rsData !== undefined && response.rsData !== null;
}
