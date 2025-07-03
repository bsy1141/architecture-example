import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @Type(() => String)
    sortBy?: string = 'createdAt';

    @IsOptional()
    @Type(() => String)
    sortOrder?: 'ASC' | 'DESC' = 'DESC';
}

export class PaginationMetaDto {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;

    constructor(page: number, limit: number, totalCount: number) {
        this.page = page;
        this.limit = limit;
        this.totalCount = totalCount;
        this.totalPages = Math.ceil(totalCount / limit);
        this.hasNext = page < this.totalPages;
        this.hasPrevious = page > 1;
    }
}

export class PaginationResponseDto<T> {
    data: T[];
    meta: PaginationMetaDto;

    constructor(data: T[], meta: PaginationMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
