import { IMenu } from "./i-menu";

export interface ILeftMenu {
    id: number;
    title: string;
    description: string;
    icon: string;
    menus: IMenu[];
}
