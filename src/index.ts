import axios, { AxiosInstance } from 'axios';
import {
    SMSParams,
    AuthSMSParams,
    VerifyAuthSMSParams,
    DSMSResponse,
    APIRoutes,
    DSMSAxiosResponse
} from './types';

class DSMS {
    private static readonly BASE_API_URL: string = "https://api.dexchange-sms.com/api/";
    private static readonly ROUTES: APIRoutes = {
        SMS: "send/sms/",
        OTP: "send/otp/",
        VERIFY: "verify/otp/",
    };

    private readonly apiKey: string;
    private readonly client: AxiosInstance;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: DSMS.BASE_API_URL,
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        });
    }

    async sendSMS(params: SMSParams): Promise<DSMSAxiosResponse> {
        if (!params.number || !params.signature || !params.content) {
            throw new Error("Missing parameters");
        }
        if (!Array.isArray(params.number)) {
            throw new Error("Number must be an array");
        }

        try {
            const response = await this.client.post<DSMSResponse>(DSMS.ROUTES.SMS, params);
            return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    async sendAuthSMS(params: AuthSMSParams): Promise<DSMSAxiosResponse> {
        if (!params.number || !params.service) {
            throw new Error("Missing parameters");
        }
        if (typeof params.number !== "string" && typeof params.number !== "number") {
            throw new Error("Number must be a string or an integer");
        }

        try {
            const response = await this.client.post<DSMSResponse>(DSMS.ROUTES.OTP, params);
            return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    async verifyAuthSMS(params: VerifyAuthSMSParams): Promise<DSMSAxiosResponse> {
        if (!params.number || !params.service || !params.otp) {
            throw new Error("Missing parameters");
        }
        if (typeof params.number !== "string" && typeof params.number !== "number") {
            throw new Error("Number must be a string or an integer");
        }
        if (typeof params.otp !== "string" && typeof params.otp !== "number") {
            throw new Error("OTP must be a string or an integer");
        }
        if (typeof params.service !== "string" && typeof params.service !== "number") {
            throw new Error("Service must be a string or an integer");
        }

        try {
            const response = await this.client.post<DSMSResponse>(DSMS.ROUTES.VERIFY, params);
            return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    static readonly version: string = require("../package.json").version;
}

export = DSMS;