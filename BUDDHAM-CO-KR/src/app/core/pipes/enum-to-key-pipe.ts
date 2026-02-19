import { Pipe, PipeTransform } from '@angular/core';
import { MAINCATEGORY_OPTIONS } from '@app/core/enums/main-category-type';
import { SCRIPTURE_STRUCTURE_TYPE_OPTIONS } from '../enums/scripture-structure-type';
import { CONTENTCATEGORY_OPTIONS } from '../enums/content-category';
import { ORIGINAL_LANG_OPTIONS } from '../enums/original-language';
import { POSTTYPE_OPTIONS } from '../enums/post-type';
import { SCRIPT_TYPE_OPTIONS } from '../enums/script-type';
import { SCRIPTURE_COLLECTION_OPTIONS } from '../enums/scripture-collection';
import { TRADITION_OPTIONS } from '../enums/tradition';

type EnumOptionsType =
  | 'MainCategoryType'
  | 'ScriptureStructureType'
  | 'ContentCategory'
  | 'OriginalLanguage'
  | 'PostType'
  | 'ScriptType'
  | 'ScriptureCollection'
  | 'BuddhistTradition';

@Pipe({ name: 'enumToKey' })
export class EnumToKeyPipe implements PipeTransform {

  // 🔥 enum 옵션 맵핑 테이블
  private readonly enumOptionsMap: Record<EnumOptionsType, any[]> = {
    MainCategoryType: MAINCATEGORY_OPTIONS,
    ScriptureStructureType: SCRIPTURE_STRUCTURE_TYPE_OPTIONS,
    ContentCategory: CONTENTCATEGORY_OPTIONS,
    OriginalLanguage: ORIGINAL_LANG_OPTIONS,
    PostType: POSTTYPE_OPTIONS,
    ScriptType: SCRIPT_TYPE_OPTIONS,
    ScriptureCollection: SCRIPTURE_COLLECTION_OPTIONS,
    BuddhistTradition: TRADITION_OPTIONS
  };

  /**
   *
   * @param value - enum 값
   * @param type - 'label' | 'displayTest'
   * @param enumType - enum 타입 (선택적인지만 권장!)
   * @returns
   */
  transform(
    value: number,
    type: 'label' | 'displayText' = 'label',
    enumType?: EnumOptionsType

  ): string {
    if (value === null || value === undefined) return '';
    // 🔥 enumType이 명시된 경우 (우선순위 1)
    if (enumType && this.enumOptionsMap[enumType]) {
      const option = this.enumOptionsMap[enumType].find(opt => opt.value === value);
      if (option) {
        return option[type];
      }
    }

    // 🔥 자동 탐색 (fallback - 하위 호환성)
    for (const options of Object.values(this.enumOptionsMap)) {
      const option = options.find(opt => opt.value === value);
      if (option) {
        return option[type];
      }
    }

    return value.toString();
  }
}
