import { RsCode } from "@app/core/enums/rs-code";

export interface IResponse {
  rsCode: RsCode;
  rsMessage: string;
  rsData?: any;
}

export interface IResponset<T = any> {
  rsCode: RsCode;
  rsMessage: string;
  rsData?: T;
}
