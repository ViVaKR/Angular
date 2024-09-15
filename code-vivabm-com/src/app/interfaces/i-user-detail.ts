export interface IUserDetail {
    id: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    roles: string[];
    phoneNumber: string;
    twoFacotrEnabled: boolean;
    phoneNumberConfirmed: boolean;
    accessFailedCount: number;
}
