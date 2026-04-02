export interface IScriptureCategory {
    code: string;
    nameKr: string;
    nameEn?: string | null;
    nameCh?: string | null;
    nameJp?: string | null;
    parentGroup?: string | null;
    scriptureMajorCategoryId?: number | null;
    displayOrder: number;
    icon?: string | null;
    color?: string | null;
    scriptureCount: number;
    totalPassageCount: number;
    progressRate: number;
    originRegion?: string | null;
    tradition?: string | null;
    language?: string | null;
    period?: string | null;
    description?: string | null;
    metaData?: string | null;
}


// --- View
export interface IScriptureCategoryView extends IScriptureCategory { }
export interface IScriptureCategoryEntry extends IScriptureCategory { }
export interface IScriptureCategoryPatch extends IScriptureCategory { }
