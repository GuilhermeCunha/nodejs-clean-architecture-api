import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'
import * as path from 'path'
import { TYPE_ORM_ENTITIES } from '../../infrastructure/db/typeorm/entities'

const migrationsRelativePath = path.resolve(
    __dirname,
    '..',
    '..',
    'infrastructure/db/typeorm/mysql/migrations/*.{ts,js}'
)

export default {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: TYPE_ORM_ENTITIES,
    migrations: [migrationsRelativePath],
} as DataSourceOptions
