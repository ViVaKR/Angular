export interface ITwoFactorUser {
  id: string;
  email: string;
  fullName: string;
  pseudonym: string;
  avatar: string;
  roles: string[];
  twoFacotorEnabled: boolean;
}
