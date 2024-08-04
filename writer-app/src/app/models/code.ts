import { AppUser } from "./app-user";
import { Category } from "./category";

export class Code {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public created: Date,
        public appUserId: number,
        public categoryId: number,
        public appUser: AppUser,
        public category: Category) {
    }
}
