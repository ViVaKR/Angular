import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Utility {

    @Output() value = new EventEmitter<number>();

    // 초성(19개)
    CHO_HANGUL = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
        'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];

    // 중성(21개)
    JUNG_HANGUL = [
        'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
        'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
        'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
        'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
    ];
    // 종성(28개)
    JONG_HANGUL = [
        '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
        'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
        'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
        'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];

    CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0)); // 588 ( 28 * 21 )
    JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0)); // 28

    HANGUL_START_CHARCODE = '가'.charCodeAt(0);
    HANGUL_END_CHARCODE = '힣'.charCodeAt(0);

    // 조합 된 글자인지 체크 (가 ~ 힣 사이)
    isHangul(charCode: number) {
        return this.HANGUL_START_CHARCODE <= charCode && charCode <= this.HANGUL_END_CHARCODE;
    }

    // 한글을 초성, 중성, 종성으로 나누기
    divideHangul(letter: string): void {
        const letterCode = letter.charCodeAt(0);

        if (!this.isHangul(letterCode)) {
            return;
        }

        const charCode = letterCode - this.HANGUL_START_CHARCODE;

        const choIndex = Math.floor(charCode / this.CHO_PERIOD);
        const jungIndex = Math.floor((charCode % this.CHO_PERIOD) / this.JUNG_PERIOD);
        const jongIndex = charCode % this.JUNG_PERIOD;

        const chojungjong = {
            cho: this.CHO_HANGUL[choIndex],
            jung: this.JUNG_HANGUL[jungIndex],
            jong: this.JONG_HANGUL[jongIndex],
        };

        let v = 0;
        switch (this.CHO_HANGUL[choIndex]) {

            case 'ㄱ':
                v = 0;
                break;

            case 'ㄲ':
                v = 0;
                break;

            case 'ㄴ':
                v = 1;
                break;

            case 'ㄷ':
                v = 2;
                break;

            case 'ㄸ':
                v = 2;
                break;

            case 'ㄹ':
                v = 3;
                break;

            case 'ㅁ':
                v = 4;
                break;

            case 'ㅂ':
                v = 5;
                break;

            case 'ㅃ':
                v = 5;
                break;

            case 'ㅅ':
                v = 6;
                break;

            case 'ㅆ':
                v = 6;
                break;

            case 'ㅇ':
                v = 7;
                break;

            case 'ㅈ':
                v = 8;
                break;

            case 'ㅉ':
                v = 8;
                break;

            case 'ㅊ':
                v = 9;
                break;

            case 'ㅋ':
                v = 10;
                break;

            case 'ㅌ':
                v = 11;
                break;

            case 'ㅍ':
                v = 12;
                break;

            case 'ㅎ':
                v = 13;
                break;
        }

        this.value.emit(v);
    }
}
