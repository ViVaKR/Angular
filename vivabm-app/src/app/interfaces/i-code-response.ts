import { ICode } from "./i-code";

export interface ICodeResponse {
    isSuccess: boolean;
    message: string;
    code: ICode | undefined | null;
}
