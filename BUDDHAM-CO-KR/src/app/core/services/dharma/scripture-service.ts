import { Injectable } from '@angular/core';
import { BaseGenericService } from '../base/base-generic-service';
import { IScriptureEntry, IScripturePatch, IScriptureView } from '@app/core/interfaces/dharma/i-scripture';

@Injectable({
  providedIn: 'root',
})
export class ScriptureService extends BaseGenericService<IScriptureView, IScriptureEntry, IScripturePatch> {
  protected override controllerName = "Dharma";
  protected override resourceName = "Scripture"
}
