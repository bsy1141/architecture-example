import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClientClass {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.instance.interceptors.request.use(
            config => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error),
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken =
                            localStorage.getItem('refresh_token');
                        if (refreshToken) {
                            const response = await this.instance.post(
                                '/auth/refresh',
                                {
                                    refresh_token: refreshToken,
                                },
                            );

                            const { access_token } = response.data;
                            localStorage.setItem('access_token', access_token);

                            originalRequest.headers.Authorization = `Bearer ${access_token}`;
                            return this.instance(originalRequest);
                        }
                    } catch (refreshError) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        window.location.href = '/login';
                    }
                }

                return Promise.reject(error);
            },
        );
    }

    get<T = any>(url: string, config?: AxiosRequestConfig) {
        return this.instance.get<T>(url, config);
    }

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.post<T>(url, data, config);
    }

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.put<T>(url, data, config);
    }

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.patch<T>(url, data, config);
    }

    delete<T = any>(url: string, config?: AxiosRequestConfig) {
        return this.instance.delete<T>(url, config);
    }
}

export const ApiClient = new ApiClientClass();
