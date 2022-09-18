import { DataSource, DataSourceOptions } from 'typeorm'

export class TypeORMDatabase {
    dataSource: DataSource
    constructor(options: DataSourceOptions) {
        this.dataSource = new DataSource(options)
    }
    async getDatabase() {
        if (!this.dataSource.isInitialized) {
            return await this.dataSource.initialize()
        }

        return this.dataSource
    }
}
