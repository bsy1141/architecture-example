export const formatNumber = (num: number, locale: string = 'ko-KR'): string => {
    return new Intl.NumberFormat(locale).format(num);
};

export const formatCurrency = (
    amount: number,
    currency: string = 'KRW',
    locale: string = 'ko-KR',
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
};

export const formatPercent = (
    value: number,
    locale: string = 'ko-KR',
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(value / 100);
};

export const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
};

export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return phone;
};

export const formatBusinessNumber = (businessNumber: string): string => {
    const cleaned = businessNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{5})$/);

    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return businessNumber;
};

export const maskString = (
    str: string,
    visibleChars: number = 2,
    maskChar: string = '*',
): string => {
    if (str.length <= visibleChars * 2) {
        return str;
    }

    const start = str.slice(0, visibleChars);
    const end = str.slice(-visibleChars);
    const maskLength = str.length - visibleChars * 2;

    return start + maskChar.repeat(maskLength) + end;
};

export const maskEmail = (email: string): string => {
    const [name, domain] = email.split('@');
    if (!domain) return email;

    const maskedName =
        name.length > 2 ? name.slice(0, 2) + '*'.repeat(name.length - 2) : name;

    return `${maskedName}@${domain}`;
};
