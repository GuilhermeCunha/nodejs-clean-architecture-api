import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'

const modelsRelativePath = 'src/infrastructure/db/typeorm/entities/*.{ts,js}'
const migrationsRelativePath =
    'src/infrastructure/db/typeorm/mysql/migrations/*.{ts,js}'

export default {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [modelsRelativePath],
    migrations: [migrationsRelativePath],
} as DataSourceOptions
