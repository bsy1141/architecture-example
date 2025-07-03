import { applyDecorators } from '@nestjs/common';

export function ApiResponseDecorator(options: {
    status: number;
    description: string;
    type?: any;
}) {
    return applyDecorators();
    // ApiResponse 데코레이터를 사용하여 Swagger 문서화
    // @ApiResponse({
    //   status: options.status,
    //   description: options.description,
    //   type: options.type,
    // }),
}
