export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    CLASSROOM: '/classroom',
    ONBOARDING: '/onboarding',
    ONBOARDING_STEP1: '/onboarding/step1',
    ONBOARDING_STEP2: '/onboarding/step2',
    SETTINGS: '/settings',
    HELP: '/help',
    ADMIN: '/admin',
    NOT_FOUND: '/404',
} as const;

export const PUBLIC_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.HOME,
    ROUTES.NOT_FOUND,
] as const;

export const PROTECTED_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.PROFILE,
    ROUTES.CLASSROOM,
    ROUTES.ONBOARDING,
    ROUTES.ONBOARDING_STEP1,
    ROUTES.ONBOARDING_STEP2,
    ROUTES.SETTINGS,
    ROUTES.ADMIN,
] as const;
