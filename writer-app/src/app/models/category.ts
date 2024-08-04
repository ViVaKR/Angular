import { Code } from "./code";

export class Category {

    constructor(
        public id: number,
        public categoryName: string,
        public platform: string,
        public codes: Code[]) {
    }
}
