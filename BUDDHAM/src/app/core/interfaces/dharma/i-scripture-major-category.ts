export interface IScriptureMajorCategory {
    code: string;
    nameKr?: string | null;
    nameEn?: string | null;
    icon?: string | null;
    color?: string | null;
    isActive: boolean;
    description?: string | null;
}

// --- View
export interface IScriptureMajorCategoryView extends IScriptureMajorCategory {
    id: number;
}

// --- Create
export interface IScriptureMajorCategoryEntry extends IScriptureMajorCategory { }

// --- Update
export interface IScriptureMajorCategoryPatch extends IScriptureMajorCategory {
    id: number;
}
