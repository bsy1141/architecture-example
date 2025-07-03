import { LogLevel, LogEntry, LoggerFormatter } from './types';

export const defaultFormatter: LoggerFormatter = {
    format(entry: LogEntry): string {
        const timestamp = entry.timestamp.toISOString();
        const level = LogLevel[entry.level];
        const context = entry.context ? `[${entry.context}]` : '';
        const meta = entry.meta ? ` ${JSON.stringify(entry.meta)}` : '';
        const stack = entry.stack ? `\n${entry.stack}` : '';

        return `${timestamp} [${level}]${context} ${entry.message}${meta}${stack}`;
    },
};

export const jsonFormatter: LoggerFormatter = {
    format(entry: LogEntry): string {
        const logObject = {
            timestamp: entry.timestamp.toISOString(),
            level: LogLevel[entry.level],
            message: entry.message,
            context: entry.context,
            meta: entry.meta,
            stack: entry.stack,
            userId: entry.userId,
            requestId: entry.requestId,
            sessionId: entry.sessionId,
            ip: entry.ip,
            userAgent: entry.userAgent,
        };

        // undefined 값들을 제거
        Object.keys(logObject).forEach(key => {
            if (logObject[key] === undefined) {
                delete logObject[key];
            }
        });

        return JSON.stringify(logObject);
    },
};

export const simpleFormatter: LoggerFormatter = {
    format(entry: LogEntry): string {
        const level = LogLevel[entry.level];
        const context = entry.context ? `[${entry.context}]` : '';

        return `[${level}]${context} ${entry.message}`;
    },
};

export const coloredFormatter: LoggerFormatter = {
    format(entry: LogEntry): string {
        const colors = {
            [LogLevel.ERROR]: '\x1b[31m', // Red
            [LogLevel.WARN]: '\x1b[33m', // Yellow
            [LogLevel.INFO]: '\x1b[36m', // Cyan
            [LogLevel.DEBUG]: '\x1b[32m', // Green
            [LogLevel.VERBOSE]: '\x1b[37m', // White
        };

        const reset = '\x1b[0m';
        const color = colors[entry.level] || colors[LogLevel.INFO];

        const timestamp = entry.timestamp.toISOString();
        const level = LogLevel[entry.level];
        const context = entry.context ? `[${entry.context}]` : '';

        return `${color}${timestamp} [${level}]${context} ${entry.message}${reset}`;
    },
};

export const detailedFormatter: LoggerFormatter = {
    format(entry: LogEntry): string {
        const timestamp = entry.timestamp.toISOString();
        const level = LogLevel[entry.level];
        const context = entry.context ? `[${entry.context}]` : '';
        const userId = entry.userId ? `[User:${entry.userId}]` : '';
        const requestId = entry.requestId ? `[Req:${entry.requestId}]` : '';
        const sessionId = entry.sessionId ? `[Session:${entry.sessionId}]` : '';

        let result = `${timestamp} [${level}]${context}${userId}${requestId}${sessionId} ${entry.message}`;

        if (entry.meta) {
            result += `\n  Meta: ${JSON.stringify(entry.meta, null, 2)}`;
        }

        if (entry.stack) {
            result += `\n  Stack: ${entry.stack}`;
        }

        return result;
    },
};

export const formatters = {
    default: defaultFormatter,
    json: jsonFormatter,
    simple: simpleFormatter,
    colored: coloredFormatter,
    detailed: detailedFormatter,
};
