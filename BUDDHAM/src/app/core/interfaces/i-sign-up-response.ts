import { IUser } from "./i-user";

export interface ISignUpResponse {
  isSuccess: boolean;
  message: string;
  data: IUser;
}
