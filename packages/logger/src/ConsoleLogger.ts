import { LogLevel, LogEntry, ConsoleLoggerOptions } from './types';

export class ConsoleLogger {
    private options: ConsoleLoggerOptions;

    constructor(options: ConsoleLoggerOptions = {}) {
        this.options = {
            colorize: true,
            timestamp: true,
            level: LogLevel.INFO,
            ...options,
        };
    }

    log(entry: LogEntry, formattedMessage: string): void {
        if (entry.level > (this.options.level || LogLevel.INFO)) {
            return;
        }

        const colorizedMessage = this.options.colorize
            ? this.colorize(entry.level, formattedMessage)
            : formattedMessage;

        switch (entry.level) {
            case LogLevel.ERROR:
                console.error(colorizedMessage);
                break;
            case LogLevel.WARN:
                console.warn(colorizedMessage);
                break;
            case LogLevel.INFO:
                console.info(colorizedMessage);
                break;
            case LogLevel.DEBUG:
                console.debug(colorizedMessage);
                break;
            case LogLevel.VERBOSE:
                console.log(colorizedMessage);
                break;
            default:
                console.log(colorizedMessage);
        }
    }

    private colorize(level: LogLevel, message: string): string {
        const colors = {
            [LogLevel.ERROR]: '\x1b[31m', // Red
            [LogLevel.WARN]: '\x1b[33m', // Yellow
            [LogLevel.INFO]: '\x1b[36m', // Cyan
            [LogLevel.DEBUG]: '\x1b[32m', // Green
            [LogLevel.VERBOSE]: '\x1b[37m', // White
        };

        const reset = '\x1b[0m';
        const color = colors[level] || colors[LogLevel.INFO];

        return `${color}${message}${reset}`;
    }

    private getLevelName(level: LogLevel): string {
        const levelNames = {
            [LogLevel.ERROR]: 'ERROR',
            [LogLevel.WARN]: 'WARN',
            [LogLevel.INFO]: 'INFO',
            [LogLevel.DEBUG]: 'DEBUG',
            [LogLevel.VERBOSE]: 'VERBOSE',
        };

        return levelNames[level] || 'INFO';
    }
}
