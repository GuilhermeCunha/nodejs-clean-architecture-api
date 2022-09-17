import { AppDataSource } from './data-source'

export class Database {
    async getDatabase() {
        if (!AppDataSource.isInitialized) {
            return await AppDataSource.initialize()
        }

        return AppDataSource
    }
}
