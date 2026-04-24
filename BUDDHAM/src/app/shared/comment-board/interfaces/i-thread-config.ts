import { Observable } from "rxjs";
import { ILikeResponse } from "./i-like-response";
import { IReply } from "./i-reply";
import { IThreadable } from "./i-threadable";
// 🔥 T = rootItem, U = 댓글, R = 좋아요 응답
export interface IThreadConfig<
  T extends IThreadable,          // rootItem 타입 (IDharmaScriptureView 등)
  U extends IReply,               // 댓글 타입 (IScriptureComment 등)
  R extends ILikeResponse = ILikeResponse  // 기본값으로 생략 가능
> {
  fetchRepliesUrl: (rootId: number | string) => string;
  createCommentFn: (root: T, content: string) => Observable<U>; // 🔥 any → T
  createReplyFn: (target: U, content: string) => Observable<U>;
  toggleLikeFn: (id: number | string) => Observable<R>;
  getAvatarUrlFn?: (reply: U) => string;
}

/*
타입역할예시T최상위 아이템IDharmaScriptureViewU댓글/대댓글IScriptureCommentR좋아요 응답ILikeResponse (생략 가능)

*/
