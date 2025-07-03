export const validationRules = {
    email: {
        required: '이메일을 입력해주세요.',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '올바른 이메일 형식이 아닙니다.',
        },
    },
    password: {
        required: '비밀번호를 입력해주세요.',
        minLength: {
            value: 6,
            message: '비밀번호는 최소 6자 이상이어야 합니다.',
        },
    },
    username: {
        required: '사용자명을 입력해주세요.',
        minLength: {
            value: 2,
            message: '사용자명은 최소 2자 이상이어야 합니다.',
        },
        maxLength: {
            value: 20,
            message: '사용자명은 최대 20자까지 가능합니다.',
        },
    },
    name: {
        required: '이름을 입력해주세요.',
        minLength: {
            value: 2,
            message: '이름은 최소 2자 이상이어야 합니다.',
        },
    },
};

export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
    return username.length >= 2 && username.length <= 20;
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};
