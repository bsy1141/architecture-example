export const APP_CONSTANTS = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    DEFAULT_SORT_ORDER: 'ASC',
    JWT_EXPIRES_IN: '1d',
    BCRYPT_SALT_ROUNDS: 10,
    CACHE_TTL: 3600, // 1시간
} as const;

export const VALIDATION_MESSAGES = {
    EMAIL_INVALID: '유효한 이메일 주소를 입력해주세요.',
    PASSWORD_TOO_SHORT: '비밀번호는 최소 6자 이상이어야 합니다.',
    USERNAME_TOO_SHORT: '사용자명은 최소 2자 이상이어야 합니다.',
    REQUIRED_FIELD: '필수 항목입니다.',
} as const;
