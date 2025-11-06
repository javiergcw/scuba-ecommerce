import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { GATEWAY_URL } from '@/core/const/url_const';

interface ApiError {
    errorType: "network-error" | "unauthorized" | "other";
    message: string;
}

export class ApiService {

    private static instance = axios.create({
        baseURL: GATEWAY_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-license-Key': process.env.NEXT_PUBLIC_LICENSE_KEY || '5cef21be9f78ab3844598129e69f14f8f8b4a23e9dcce403a69b6e3e85d1a673'
        },
    });

    public static async request<T>(config: AxiosRequestConfig): Promise<T | ApiError | null> {
        try {
            const response: AxiosResponse<T> = await this.instance(config);
            if (response.status < 300) {
                return response.data;
            }

            return null;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public static async requestS3<T>(config: AxiosRequestConfig): Promise<T | ApiError | null> {
        try {
            const response: AxiosResponse<T> = await this.instance(config);
            if (response.status < 300) {
                return response.data;
            }

            return null;
        } catch (error) {
            return this.handleError(error);
        }
    }

    private static handleError(error: unknown): ApiError | null {

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (!axiosError.response) {
                return { errorType: "network-error", message: "Error de conexión" };
            }

            return { errorType: "other", message: axiosError.response.statusText };
        }

        console.error("❌ Error desconocido:", error);
        return { errorType: "other", message: "Error desconocido" };
    }
}