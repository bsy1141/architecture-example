import { Logger } from './Logger';
import { LogLevel, LoggerConfig, LoggerTransport } from './types';
import { defaultFormatter } from './formatters';

export function createLogger(config: Partial<LoggerConfig> = {}): Logger {
    const defaultTransports: LoggerTransport[] = [
        {
            type: 'console',
            options: {
                colorize: true,
                timestamp: true,
            },
        },
    ];

    const fullConfig: LoggerConfig = {
        level: LogLevel.INFO,
        transports: defaultTransports,
        formatter: defaultFormatter,
        silent: false,
        ...config,
    };

    return new Logger(fullConfig);
}

export function createFileLogger(
    filename: string,
    level: LogLevel = LogLevel.INFO,
): Logger {
    return createLogger({
        level,
        transports: [
            {
                type: 'file',
                options: {
                    filename,
                    maxSize: '10m',
                    maxFiles: 5,
                    dirname: './logs',
                },
            },
        ],
    });
}

export function createConsoleLogger(level: LogLevel = LogLevel.INFO): Logger {
    return createLogger({
        level,
        transports: [
            {
                type: 'console',
                options: {
                    colorize: true,
                    timestamp: true,
                },
            },
        ],
    });
}
