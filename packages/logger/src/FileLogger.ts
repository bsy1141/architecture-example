import * as fs from 'fs';
import * as path from 'path';
import { LogLevel, LogEntry, FileLoggerOptions } from './types';

export class FileLogger {
    private options: FileLoggerOptions;
    private writeStream?: fs.WriteStream;

    constructor(options: FileLoggerOptions) {
        this.options = {
            maxSize: '10m',
            maxFiles: 5,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            dirname: './logs',
            ...options,
        };

        this.initializeWriteStream();
    }

    private initializeWriteStream(): void {
        const logDir = this.options.dirname || './logs';

        // 로그 디렉토리가 없으면 생성
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const filename = this.generateFilename();
        const filepath = path.join(logDir, filename);

        this.writeStream = fs.createWriteStream(filepath, { flags: 'a' });

        this.writeStream.on('error', error => {
            console.error('FileLogger write stream error:', error);
        });
    }

    private generateFilename(): string {
        const now = new Date();
        const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const baseFilename = this.options.filename;

        // 파일명에 날짜 패턴이 있으면 교체
        if (this.options.datePattern) {
            return baseFilename.replace(/(\.[^.]+)$/, `-${dateString}$1`);
        }

        return baseFilename;
    }

    log(entry: LogEntry, formattedMessage: string): void {
        if (!this.writeStream) {
            console.error('FileLogger: Write stream not initialized');
            return;
        }

        const logLine = `${formattedMessage}\n`;

        this.writeStream.write(logLine, error => {
            if (error) {
                console.error('FileLogger write error:', error);
            }
        });
    }

    async flush(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.writeStream) {
                resolve();
                return;
            }

            this.writeStream.write('', error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.writeStream) {
                resolve();
                return;
            }

            this.writeStream.end(error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    private shouldRotate(): boolean {
        // 파일 로테이션 로직 구현
        // 파일 크기나 날짜 기준으로 로테이션 결정
        return false;
    }

    private rotateFile(): void {
        // 파일 로테이션 로직 구현
        // 현재 파일을 아카이브하고 새 파일 생성
    }
}
