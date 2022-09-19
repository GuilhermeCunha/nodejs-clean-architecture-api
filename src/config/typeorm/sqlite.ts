import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'

const modelsRelativePath = 'src/infrastructure/db/typeorm/entities/*.{ts,js}'
const migrationsRelativePath =
    'src/infrastructure/db/typeorm/sqlite/migrations/*.{ts,js}'

export default {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    entities: [modelsRelativePath],
    migrations: [migrationsRelativePath],
} as DataSourceOptions
