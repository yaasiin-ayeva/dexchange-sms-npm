import { AxiosResponse } from 'axios';

export interface SMSParams {
    number: string[];
    signature: string;
    content: string;
}

export interface AuthSMSParams {
    number: string | number;
    service: string;
    lang?: string;
}

export interface VerifyAuthSMSParams {
    number: string | number;
    service: string | number;
    otp: string | number;
}

export interface DSMSResponse {
    status: string;
    message: string;
    data?: any;
}

export type APIRoutes = {
    SMS: string;
    OTP: string;
    VERIFY: string;
};

export type DSMSAxiosResponse = AxiosResponse<DSMSResponse>;