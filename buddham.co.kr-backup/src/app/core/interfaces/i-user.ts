export interface IUser {
  id: string;
  fullName: string;
  pseudonym: string;
  email: string;
  emailConfirmed: boolean;
  roles: string[];
  phoneNumber: string;
  twoFacotorEnabled: boolean;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
  avatar: string;
}
