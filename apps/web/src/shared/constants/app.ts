export const APP_CONFIG = {
    APP_NAME: 'Architecture Example',
    APP_VERSION: '1.0.0',
    APP_DESCRIPTION: 'Modern web application architecture example',
    DEFAULT_LANGUAGE: 'ko',
    SUPPORTED_LANGUAGES: ['ko', 'en'] as const,
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 10,
        MAX_PAGE_SIZE: 100,
    },
    CACHE: {
        TTL: 5 * 60 * 1000, // 5 minutes
    },
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 3000,
} as const;

export const LOCAL_STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme',
    LANGUAGE: 'language',
} as const;

export const THEME_OPTIONS = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
} as const;
