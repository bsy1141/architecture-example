import {
    LogLevel,
    LogEntry,
    LoggerConfig,
    LoggerTransport,
    LoggerFormatter,
} from './types';
import { ConsoleLogger } from './ConsoleLogger';
import { FileLogger } from './FileLogger';
import { defaultFormatter } from './formatters';

export class Logger {
    private config: LoggerConfig;
    private transports: Map<string, any> = new Map();
    private formatter: LoggerFormatter;
    private context?: string;

    constructor(config: LoggerConfig) {
        this.config = config;
        this.formatter = config.formatter || defaultFormatter;
        this.context = config.context;
        this.initializeTransports();
    }

    private initializeTransports(): void {
        this.config.transports.forEach((transportConfig, index) => {
            const transportId = `${transportConfig.type}-${index}`;

            switch (transportConfig.type) {
                case 'console':
                    this.transports.set(
                        transportId,
                        new ConsoleLogger(transportConfig.options),
                    );
                    break;
                case 'file':
                    this.transports.set(
                        transportId,
                        new FileLogger(transportConfig.options),
                    );
                    break;
                default:
                    console.warn(
                        `Unknown transport type: ${transportConfig.type}`,
                    );
            }
        });
    }

    error(message: string, meta?: Record<string, any>, stack?: string): void {
        this.log(LogLevel.ERROR, message, meta, stack);
    }

    warn(message: string, meta?: Record<string, any>): void {
        this.log(LogLevel.WARN, message, meta);
    }

    info(message: string, meta?: Record<string, any>): void {
        this.log(LogLevel.INFO, message, meta);
    }

    debug(message: string, meta?: Record<string, any>): void {
        this.log(LogLevel.DEBUG, message, meta);
    }

    verbose(message: string, meta?: Record<string, any>): void {
        this.log(LogLevel.VERBOSE, message, meta);
    }

    private log(
        level: LogLevel,
        message: string,
        meta?: Record<string, any>,
        stack?: string,
    ): void {
        if (this.config.silent || level > this.config.level) {
            return;
        }

        const entry: LogEntry = {
            level,
            message,
            timestamp: new Date(),
            meta,
            stack,
            context: this.context,
        };

        this.writeToTransports(entry);
    }

    private writeToTransports(entry: LogEntry): void {
        const formattedMessage = this.formatter.format(entry);

        this.transports.forEach((transport, transportId) => {
            try {
                const transportConfig = this.config.transports.find(t =>
                    transportId.startsWith(t.type),
                );

                if (
                    transportConfig &&
                    (transportConfig.level === undefined ||
                        entry.level <= transportConfig.level)
                ) {
                    transport.log(entry, formattedMessage);
                }
            } catch (error) {
                console.error(
                    `Failed to write to transport ${transportId}:`,
                    error,
                );
            }
        });
    }

    setLevel(level: LogLevel): void {
        this.config.level = level;
    }

    setContext(context: string): void {
        this.context = context;
    }

    getContext(): string | undefined {
        return this.context;
    }

    child(context: string): Logger {
        const childConfig = {
            ...this.config,
            context: this.context ? `${this.context}.${context}` : context,
        };

        return new Logger(childConfig);
    }

    async flush(): Promise<void> {
        const flushPromises = Array.from(this.transports.values()).map(
            transport => {
                if (typeof transport.flush === 'function') {
                    return transport.flush();
                }
                return Promise.resolve();
            },
        );

        await Promise.all(flushPromises);
    }

    async close(): Promise<void> {
        const closePromises = Array.from(this.transports.values()).map(
            transport => {
                if (typeof transport.close === 'function') {
                    return transport.close();
                }
                return Promise.resolve();
            },
        );

        await Promise.all(closePromises);
        this.transports.clear();
    }
}
