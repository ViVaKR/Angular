import { HangulOrder } from '@app/types/hangul-order';

export interface BuddistScripture {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    translator: string;
    summary: string;
    sutra: string;
    originalText: string;
    annotation: string;
    hangulOrder: HangulOrder;
    created: Date;
}

export interface SutraDataSource {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    translator: string;
    summary: string;
    sutra: string;
    originalText: string;
    annotation: string;
    hangulOrder: HangulOrder;
    created: Date;
}
