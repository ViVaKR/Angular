export interface IPublicIp {
    ip: string;
    type: string;
    timestamp: Date;
    headers: IPublicIpHeaders;
}

export interface IPublicIpHeaders {
    "x-forwarded-for": string;
    "x-real-ip": string;
}
