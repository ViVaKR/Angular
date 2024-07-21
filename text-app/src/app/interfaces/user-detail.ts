export interface UserDetail {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
    phoneNumber: string;
    twoFacotrEnabled: boolean;
    phoneNumberConfirmed: boolean;
    accessFailedCount: number;
}
