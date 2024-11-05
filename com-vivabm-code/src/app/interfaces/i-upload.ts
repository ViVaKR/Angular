export interface IUpload {
    content: any | null;
    progress: number;
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}
