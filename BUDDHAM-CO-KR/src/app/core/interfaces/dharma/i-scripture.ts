export interface IScriptureSchema {
    id: number;
    abbr: string;
    nameKr: string;
    nameEn?: string | null;
    originLang: string;
    originName?: string;
    tier: Tier;
}

// --- View
export interface IScriptureView extends IScriptureSchema { }

// --- Create
export interface IScriptureEntry extends IScriptureSchema { }

// --- Update
export interface IScripturePatch extends IScriptureSchema { }

export enum Tier {
    Core = 1, // 핵심 (누구나 아는 대표 경전)
    Important = 2, // 중요 (불교 공부에 필수적)
    Extensions = 3 // 확장 (전문 연구용)
}
