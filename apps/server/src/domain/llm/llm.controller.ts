import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LlmService } from './llm.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('llm')
export class LlmController {
    constructor(private readonly llmService: LlmService) {}

    @Post('chat')
    @UseGuards(JwtAuthGuard)
    async chat(@Body() chatRequestDto: ChatRequestDto) {
        return this.llmService.chat(chatRequestDto);
    }

    @Post('generate')
    @UseGuards(JwtAuthGuard)
    async generate(@Body() generateRequestDto: any) {
        return this.llmService.generate(generateRequestDto);
    }
}
