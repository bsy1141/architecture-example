import { useState, useEffect, useCallback } from 'react';
import { authApi, AuthResponse } from '../api/auth.api';
import { LOCAL_STORAGE_KEYS } from '../constants/app';

interface UseAuthState {
    user: AuthResponse['user'] | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const useAuth = () => {
    const [state, setState] = useState<UseAuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false,
    });

    const setUser = useCallback((user: AuthResponse['user'] | null) => {
        setState(prev => ({
            ...prev,
            user,
            isAuthenticated: !!user,
            isLoading: false,
        }));
    }, []);

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                const response = await authApi.login({ email, password });
                localStorage.setItem(
                    LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
                    response.access_token,
                );
                setUser(response.user);
                return { success: true, user: response.user };
            } catch (error) {
                return {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                };
            }
        },
        [setUser],
    );

    const register = useCallback(
        async (userData: Parameters<typeof authApi.register>[0]) => {
            try {
                const response = await authApi.register(userData);
                localStorage.setItem(
                    LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
                    response.access_token,
                );
                setUser(response.user);
                return { success: true, user: response.user };
            } catch (error) {
                return {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                };
            }
        },
        [setUser],
    );

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
            setUser(null);
        }
    }, [setUser]);

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

        if (!token) {
            setState(prev => ({ ...prev, isLoading: false }));
            return;
        }

        try {
            const user = await authApi.getProfile();
            setUser(user);
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
            setUser(null);
        }
    }, [setUser]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        ...state,
        login,
        register,
        logout,
        checkAuth,
    };
};
