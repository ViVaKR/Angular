import { Injectable } from '@angular/core';
import { ICanonEntry, ICanonPatch, ICanonView } from '@app/core/interfaces/dharma/i-canon-schema';
import { BaseGenericService } from '@services/base/base-generic-service';

export type CanonUpsert = ICanonEntry & Partial<ICanonPatch>;

@Injectable({ providedIn: 'root' })
export class CanonService extends BaseGenericService<ICanonView, ICanonEntry, ICanonPatch> {

  protected override controllerName = 'Dharma';
  protected override resourceName = 'Canon';

}
