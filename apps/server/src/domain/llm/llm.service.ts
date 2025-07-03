import { Injectable } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class LlmService {
    async chat(chatRequestDto: ChatRequestDto) {
        // OpenAI API 호출 로직 예시
        // const response = await this.openaiService.chat(chatRequestDto);

        // 예시 응답
        return {
            message: `Echo: ${chatRequestDto.message}`,
            timestamp: new Date(),
            model: 'gpt-3.5-turbo',
        };
    }

    async generate(generateRequestDto: any) {
        // 텍스트 생성 로직
        return {
            generated_text: 'This is a generated text example',
            timestamp: new Date(),
            model: 'gpt-3.5-turbo',
        };
    }

    async embeddings(text: string) {
        // 텍스트 임베딩 생성 로직
        return {
            embeddings: [0.1, 0.2, 0.3], // 예시 임베딩
            model: 'text-embedding-ada-002',
        };
    }
}
