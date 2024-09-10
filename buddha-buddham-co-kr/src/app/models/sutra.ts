import { BuddistScripture } from "@app/types/buddist-scripture";
import { HangulOrder } from "@app/types/hangul-order";

export class Sutra implements BuddistScripture {

    constructor(
        public id: number,
        public title: string,
        public subtitle: string,
        public author: string,
        public translator: string,
        public summary: string,
        public sutra: string,
        public originalText: string,
        public annotation: string,
        public hangulOrder: HangulOrder,
        public created: Date,
        public userId: string,
        public userName: string
    ) { }
}
