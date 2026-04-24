import { Injectable } from '@angular/core';
import { BaseGenericService } from '../base/base-generic-service';
import { IScriptureMajorCategoryEntry, IScriptureMajorCategoryPatch, IScriptureMajorCategoryView } from '@app/core/interfaces/dharma/i-scripture-major-category';

@Injectable({
  providedIn: 'root',
})
export class ScriptureMajorCategoryService extends BaseGenericService<
  IScriptureMajorCategoryView,
  IScriptureMajorCategoryEntry,
  IScriptureMajorCategoryPatch
> {
  protected override controllerName: string = "Dharma";
  protected override resourceName = "ScriptureMajorCategory";
}
