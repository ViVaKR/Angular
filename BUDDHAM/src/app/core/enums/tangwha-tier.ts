import { IEnumTypeOptions } from "../interfaces/i-enum-type-options";

export enum TangwhaTier {
    NationalTreasure = 1,
    Treasure = 2,
    General = 3
}

export const TANAGWHATIER_OPTIONS: IEnumTypeOptions<TangwhaTier>[] = [
    { value: TangwhaTier.NationalTreasure, displayText: '국보', toolTips: '국보급 탱화' },
    { value: TangwhaTier.Treasure, displayText: '보물', toolTips: '보물급 탱화' },
    { value: TangwhaTier.General, displayText: '일반', toolTips: '일반 탱화' },
]
