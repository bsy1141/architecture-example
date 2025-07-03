import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class ChatRequestDto {
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    model?: string = 'gpt-3.5-turbo';

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
    temperature?: number = 0.7;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(4000)
    maxTokens?: number = 1000;

    @IsOptional()
    @IsString()
    systemPrompt?: string;
}
