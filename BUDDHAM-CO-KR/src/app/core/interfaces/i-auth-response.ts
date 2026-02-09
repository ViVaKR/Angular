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
