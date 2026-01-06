export interface IAuthResponse {
  isSuccess: boolean;
  message: string;
  token: string;
  refreshToken: string;
  refreshTokenExpiry?: Date;
  emailConfirmed?: boolean;
  showEmailConfirmation?: boolean;
  requiresTwoFactor?: boolean;
}
