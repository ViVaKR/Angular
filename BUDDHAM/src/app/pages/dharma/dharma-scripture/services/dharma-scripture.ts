import { Injectable } from '@angular/core';
import {
  IDharmaScriptureCreate,
  IDharmaScriptureUpdate,
  IDharmaScriptureView,
} from '@app/core/interfaces/dharma/i-scripture';
import { BaseGenericService } from '@app/core/services/base/base-generic-service';

@Injectable({ providedIn: 'root' })
export class DharmaScriptureService extends BaseGenericService<
  IDharmaScriptureView,
  IDharmaScriptureCreate,
  IDharmaScriptureUpdate
> {
  protected override controllerName = 'Dharma';
  protected override resourceName = 'Scripture';
}
