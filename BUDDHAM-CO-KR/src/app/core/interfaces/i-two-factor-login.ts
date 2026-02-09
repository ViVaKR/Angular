export interface ITwoFactorLogin {
  email: string;
  code: string;
  rememberDevice: boolean;
  deviceFingerprint?: string;
}
