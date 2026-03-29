import { Injectable } from '@angular/core';
import { BaseGenericService } from '@services/base/base-generic-service';
import { ICanonEntry, ICanonPatch, ICanonReplyCreate, ICanonView } from '@interfaces/dharma/i-canon-schema';
import { Observable } from 'rxjs';
import { IResponse } from '@interfaces/i-response';

@Injectable({ providedIn: 'root' })
export class CanonService extends BaseGenericService<ICanonView, ICanonEntry, ICanonPatch> {

  protected override controllerName = 'Dharma';
  protected override resourceName = 'Canon';

  // ── 전용 메서드 ──

  createReply(parent: ICanonView, content: string): Observable<IResponse> {
    const payload: ICanonReplyCreate = {
      parentId: parent.id,
      rootId: parent.rootId ?? parent.id,
      title: `Re: ${parent.title}`,
      content,
      mentionedUserName: parent.pseudonym
    };
    return this.http.post<IResponse>(`${this.apiBase}Create`, payload);
  }

  // 댓글 목록
  getReplies(rootId: number): Observable<ICanonView[]> {
    return this.http.get<ICanonView[]>(`${this.baseUrl}/${this.controllerName}/CanonReplies/${rootId}`);
  }
}
