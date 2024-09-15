export interface IResponse {
    responseStatus: ResponseStatus;
    responseMessage: string;
    responseData: any;
}

enum ResponseStatus {
    NoetSet = 0,
    OK = 1,
    Error = 2
}
