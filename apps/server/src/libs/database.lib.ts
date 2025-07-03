import { DataSource, EntityManager, Repository } from 'typeorm';

export class DatabaseLib {
    constructor(private dataSource: DataSource) {}

    async transaction<T>(
        fn: (manager: EntityManager) => Promise<T>,
    ): Promise<T> {
        return this.dataSource.transaction(fn);
    }

    getRepository<T>(entity: any): Repository<T> {
        return this.dataSource.getRepository(entity);
    }

    async runQuery(query: string, parameters?: any[]): Promise<any> {
        return this.dataSource.query(query, parameters);
    }

    async healthCheck(): Promise<boolean> {
        try {
            await this.dataSource.query('SELECT 1');
            return true;
        } catch (error) {
            return false;
        }
    }
}
