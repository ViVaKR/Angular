import { HangulOrder } from '@app/types/hangul-order';

export interface BuddistScripture {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    translator: string;
    summary: string;
    text: string;
    originalText: string;
    annotation: string;
    hangulOrder: HangulOrder;
    created: Date;
    userId: string;
    userName: string;

}

export interface SutraDataSource {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    translator: string;
    summary: string;
    text: string;
    originalText: string;
    annotation: string;
    hangulOrder: HangulOrder;
    created: Date;
    userId: string;
    userName: string;
}
