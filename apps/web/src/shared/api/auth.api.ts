import { ApiClient } from './client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        username: string;
        firstName?: string;
        lastName?: string;
    };
    access_token: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await ApiClient.post('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await ApiClient.post('/auth/register', data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await ApiClient.post('/auth/logout');
    },

    refresh: async (): Promise<{ access_token: string }> => {
        const response = await ApiClient.post('/auth/refresh');
        return response.data;
    },

    getProfile: async (): Promise<AuthResponse['user']> => {
        const response = await ApiClient.get('/users/me');
        return response.data;
    },
};
