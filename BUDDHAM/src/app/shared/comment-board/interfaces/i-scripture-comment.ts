import { IReply } from "./i-reply";

export interface IScriptureComment extends IReply {

  scriptureId: number; // 경전 전용 FK
}
