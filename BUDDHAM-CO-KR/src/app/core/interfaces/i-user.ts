export interface IUser {
  id: string;
  fullName: string;
  pseudonym: string;
  email: string;
  emailConfirmed: boolean;
  roles: string[];
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
  avatar: string;
  twoFactorEnabled: boolean;
}

/*
export interface IAuthResponse {
  isSuccess: boolean;
  token: string;
  refreshToken: string;
  message: string;
  refreshTokenExpiry?: Date;
  emailConfirmed?: boolean;
  showEmailConfirmation?: boolean;
  requiresTwoFactor?: boolean;
  hasTwoFactorEnabled?: boolean;
}


*/

export function isValidUser(user: unknown): user is IUser {
  return (
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'name' in user &&
    'email' in user
  );
}
