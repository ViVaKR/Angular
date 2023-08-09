import { UserDTO } from "./user-dto";

export class ResponseModel
{
  /**
   * for api response
   * @param responseCode 
   * @param responseMessage 
   * @param dataSet 
   */
  constructor(
    public responseCode: ResponseCode = ResponseCode.NotSet,
    public responseMessage: string,
    public dataSet: UserDTO) { }
}

export enum ResponseCode {
  NotSet = 0,
  OK = 1,
  Error = 2
}
