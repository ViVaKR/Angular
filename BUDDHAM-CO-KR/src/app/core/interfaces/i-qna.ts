export interface IQna {

    id: number;
    rootId: number;
    mentionedUserName?: string;
    title: string;
    content: string;
    createAt: Date;
    modifiedAt?: Date;
    userId: string;
    pseudonym: string;
    likeCount: number;

}

export interface IQnaLike {
    id: number;
    qnaId: number;
    userId: string;
    createAt: Date;
}


export interface IQnaResponse {
    id: number;
    rootId: number;
    title: string;
    content: string;
    createAt: Date;
    pseudonym: string;
    replyCount: number;
}
