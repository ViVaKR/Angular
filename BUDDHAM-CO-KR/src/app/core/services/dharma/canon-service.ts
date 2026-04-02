import { Injectable } from '@angular/core';
import { BaseGenericService } from '@services/base/base-generic-service';
import { ICanonEntry, ICanonPatch, ICanonView } from '@interfaces/dharma/i-canon-schema';
import { Observable } from 'rxjs';
import { IResponse } from '@interfaces/i-response';
import { PinOrder } from '@app/core/enums/pin-order';

@Injectable({ providedIn: 'root' })
export class CanonService extends BaseGenericService<ICanonView, ICanonEntry, ICanonPatch> {

  protected override controllerName = 'Dharma';
  protected override resourceName = 'Canon';

  // ✅ Reply는 Entry 형태로 전송 (서버 CanonCreate가 CanonEntry를 받으므로)
  createReply(parent: ICanonView, details: string): Observable<IResponse> {
    const payload: ICanonEntry = {
      title: `Re: ${parent.title}`,
      majorCategoryId: parent.majorCategoryId,      // ✅ 필수 필드
      minorCategoryCode: parent.minorCategoryCode,  // ✅ 필수 필드
      parentId: parent.id,
      rootId: parent.rootId ?? parent.id,
      mentionedUserName: parent.mentionedUserName,
      details,
      pinOrder: PinOrder.NotFixed

    };
    return this.http.post<IResponse>(`${this.apiBase}Create`, payload);
  }
  // 댓글 목록
  getReplies(rootId: number): Observable<ICanonView[]> {
    return this.http.get<ICanonView[]>(`${this.baseUrl}/${this.controllerName}/CanonReplies/${rootId}`);
  }
}
