import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'

const modelsRelativePath = 'infrastructure/db/typeorm/entities/*.{ts,js}'
const migrationsRelativePath =
    'infrastructure/db/typeorm/sqlite/migrations/*.{ts,js}'

export default {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    entities: [
        modelsRelativePath,
        `src/${modelsRelativePath}`,
        `dist/${modelsRelativePath}`,
    ],
    migrations: [
        migrationsRelativePath,
        `src/${migrationsRelativePath}`,
        `dist/${migrationsRelativePath}`,
    ],
} as DataSourceOptions
