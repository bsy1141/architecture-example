export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
    VERBOSE = 4,
}

export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
    meta?: Record<string, any>;
    stack?: string;
    context?: string;
    userId?: string;
    requestId?: string;
    sessionId?: string;
    ip?: string;
    userAgent?: string;
}

export interface LoggerConfig {
    level: LogLevel;
    transports: LoggerTransport[];
    formatter?: LoggerFormatter;
    context?: string;
    silent?: boolean;
}

export interface LoggerTransport {
    type: 'console' | 'file' | 'database' | 'http' | 'email';
    level?: LogLevel;
    format?: LoggerFormatter;
    options?: Record<string, any>;
}

export interface LoggerFormatter {
    format(entry: LogEntry): string;
}

export interface FileLoggerOptions {
    filename: string;
    maxSize?: string;
    maxFiles?: number;
    datePattern?: string;
    zippedArchive?: boolean;
    dirname?: string;
}

export interface ConsoleLoggerOptions {
    colorize?: boolean;
    timestamp?: boolean;
    level?: LogLevel;
}

export interface DatabaseLoggerOptions {
    connectionString: string;
    tableName: string;
    level?: LogLevel;
}

export interface HttpLoggerOptions {
    url: string;
    method?: 'POST' | 'PUT';
    headers?: Record<string, string>;
    level?: LogLevel;
}

export interface EmailLoggerOptions {
    to: string[];
    from: string;
    subject: string;
    smtpOptions: {
        host: string;
        port: number;
        secure?: boolean;
        auth?: {
            user: string;
            pass: string;
        };
    };
    level?: LogLevel;
}

export interface LoggerMetrics {
    totalLogs: number;
    logsByLevel: Record<LogLevel, number>;
    errorRate: number;
    averageLogsPerMinute: number;
    lastLogTime: Date;
    oldestLogTime: Date;
}
