import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'
import * as path from 'path'
import { TYPE_ORM_ENTITIES } from '../../infrastructure/db/typeorm/entities'

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
    entities: TYPE_ORM_ENTITIES,
    migrations: [migrationsRelativePath],
} as DataSourceOptions
