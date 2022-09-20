import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'
import * as path from 'path'

const modelsRelativePath = path.resolve(
    __dirname,
    '..',
    '..',
    'infrastructure/db/typeorm/entities/*.{ts,js}'
)
const migrationsRelativePath = path.resolve(
    __dirname,
    '..',
    '..',
    'infrastructure/db/typeorm/sqlite/migrations/*.{ts,js}'
)

export default {
    type: 'sqlite',
    database: `${path.resolve(__dirname, '..', '..', '..')}/data/line.sqlite`,
    dropSchema: false,
    synchronize: true,
    entities: [modelsRelativePath],
    migrations: [migrationsRelativePath],
} as DataSourceOptions
