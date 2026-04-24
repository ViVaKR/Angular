import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDharmaScriptureView } from '@app/core/interfaces/dharma/i-scripture';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';
import { IScriptureComment } from '../interfaces/i-scripture-comment';

@Injectable({ providedIn: 'root' })
export class DharmaScriptureCommentService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // 🔥 제너릭 댓글 서비스 3종 세트
  getRepliesUrl = (rootId: number | string): string =>
    `${this.baseUrl}/ScriptureComment/Replies/${rootId}`;

  createComment = (root: IDharmaScriptureView, content: string): Observable<IScriptureComment> => this.http.post<IScriptureComment>(
    `${this.baseUrl}/ScriptureComment/CommentCreate`, {
    scriptureId: root.id, // 핵심! scriptureId 로 명확히
    rootId: null, // 1 단계 댓글은 rootId null!
    parentId: null,
    content
  });

  createReply = (target: IScriptureComment, content: string): Observable<IScriptureComment> =>
    this.http.post<IScriptureComment>(
      `${this.baseUrl}/ScriptureComment/CommentCreate`,
      {
        scriptureId: target.scriptureId,
        rootId: target.rootId ?? target.id,
        parentId: target.id,
        content,
      }
    );

  toggleLike = (id: number | string): Observable<{ isLiked: boolean; likeCount: number }> =>
    this.http.post<{ isLiked: boolean; likeCount: number }>(
      `${this.baseUrl}/ScriptureComment/CommentLikes/${id}/like`, {});

  getAvatarUrl = (comment: IScriptureComment): string =>
    comment.avatar
      ? `${this.baseUrl}/Images/avatars/${comment.userId}/${comment.avatar}`
      : `${this.baseUrl}/Images/avatars/buddha.png`;
}
