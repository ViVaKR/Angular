import { Injectable } from '@angular/core';
import { BaseGenericService } from '../base/base-generic-service';
import { IScriptureCategoryEntry, IScriptureCategoryPatch, IScriptureCategoryView } from '@app/core/interfaces/dharma/i-scripture-category';

@Injectable({ providedIn: 'root' })
export class ScriptureCategoryService extends BaseGenericService<
  IScriptureCategoryView,
  IScriptureCategoryEntry,
  IScriptureCategoryPatch,
  'code' // <- TKey 만 추가
> {

  protected override controllerName = "Dharma";
  protected override resourceName = "ScriptureCategory";

  // idKey를 'code' 로 override
  protected override readonly idKey = 'code' as const;

  getByCategoryCode(code: string) {
    return this.getById(code); // 내부적으로 /Read/{code}
  }
}
