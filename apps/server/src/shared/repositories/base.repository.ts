import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { PaginationDto, PaginationMetaDto } from '../dto/pagination.dto';

export abstract class BaseRepository<T> {
    constructor(protected repository: Repository<T>) {}

    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return this.repository.findOne(options);
    }

    async create(entity: Partial<T>): Promise<T> {
        const newEntity = this.repository.create(entity);
        return this.repository.save(newEntity);
    }

    async update(id: string, entity: Partial<T>): Promise<T> {
        await this.repository.update(id, entity);
        return this.findOne({ where: { id } as any });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findPaginated(
        paginationDto: PaginationDto,
        options?: FindManyOptions<T>,
    ): Promise<{ data: T[]; meta: PaginationMetaDto }> {
        const { page, limit, sortBy, sortOrder } = paginationDto;
        const skip = (page - 1) * limit;

        const [data, totalCount] = await this.repository.findAndCount({
            ...options,
            skip,
            take: limit,
            order: sortBy ? { [sortBy]: sortOrder } : undefined,
        });

        const meta = new PaginationMetaDto(page, limit, totalCount);

        return { data, meta };
    }
}
