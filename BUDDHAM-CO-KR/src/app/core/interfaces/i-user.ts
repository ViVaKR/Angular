export interface IUser {
  id: string;
  fullName: string;
  pseudonym: string;
  email: string;
  roles: string[];
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
  avatar: string;
  twoFactorEnabled: boolean;
}

export function isValidUser(user: unknown): user is IUser {
  return (
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'name' in user &&
    'email' in user
  );
}
