export interface ICode {
    id: number;
    title: string;
    subTitle: string;
    content: string;
    created: Date;
    modified: Date;
    note: string;
    categoryId: number;
    userId: string;
    userName: string;
    myIp: string;
    attachFileName: string;
    attachImageName: string;
}
