import { ConfigService } from '@nestjs/config';

export interface AppConfig {
    port: number;
    nodeEnv: string;
    corsOrigins: string[];
    apiPrefix: string;
    jwtSecret: string;
    jwtExpiresIn: string;
}

export const getAppConfig = (configService: ConfigService): AppConfig => ({
    port: configService.get<number>('PORT', 3000),
    nodeEnv: configService.get<string>('NODE_ENV', 'development'),
    corsOrigins: configService
        .get<string>('CORS_ORIGINS', 'http://localhost:5173')
        .split(','),
    apiPrefix: configService.get<string>('API_PREFIX', 'api'),
    jwtSecret: configService.get<string>('JWT_SECRET', 'secret'),
    jwtExpiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
});
