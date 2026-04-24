import { CONTENTCATEGORY_OPTIONS } from "./content-category";
import { MAINCATEGORY_OPTIONS } from "./main-category-type";
import { ORIGINAL_LANG_OPTIONS } from "./original-language";
import { POSTTYPE_OPTIONS } from "./post-type";
import { SCRIPT_TYPE_OPTIONS } from "./script-type";
import { SCRIPTURE_COLLECTION_OPTIONS } from "./scripture-collection";
import { SCRIPTURE_STRUCTURE_TYPE_OPTIONS } from "./scripture-structure-type";
import { TRADITION_OPTIONS } from "./tradition";

// 각 options 배열의 공통 최소 타입 정의
export type EnumOption = {
    value?: any;
    label: string;
    [key: string]: any; // 나머지 프로퍼티 허용
};

export const ENUM_REGISTRY: Record<string, EnumOption[]> = {
    'MainCategoryType': MAINCATEGORY_OPTIONS,
    'ScriptureStructureType': SCRIPTURE_STRUCTURE_TYPE_OPTIONS,
    'ContentCategory': CONTENTCATEGORY_OPTIONS,
    'OriginalLanguage': ORIGINAL_LANG_OPTIONS,
    'PostType': POSTTYPE_OPTIONS,
    'ScriptType': SCRIPT_TYPE_OPTIONS,
    'ScriptureCollection': SCRIPTURE_COLLECTION_OPTIONS,
    'BuddhistTradition': TRADITION_OPTIONS,
};
