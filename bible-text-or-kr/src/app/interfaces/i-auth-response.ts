export interface IAuthResponse { // API: AuthresponseDTO
    token: string;
    isSuccess: boolean;
    message: string;
    refreshToken: string;
}
