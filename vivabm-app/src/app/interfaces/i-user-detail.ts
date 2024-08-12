export interface IUserDetail {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
    phoneNumber: string;
    twoFacotrEnabled: boolean;
    phoneNumberConfirmed: boolean;
    accessFailedCount: number;
}
