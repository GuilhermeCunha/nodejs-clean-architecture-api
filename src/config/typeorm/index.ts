import mysqlConfig from './mysql'
import sqliteConfig from './sqlite'

export const TYPEORM_CONFGS = {
    mysql: mysqlConfig,
    sqlite: sqliteConfig,
}

export default TYPEORM_CONFGS[
    process.env.DATABASE_TYPE as keyof typeof TYPEORM_CONFGS
]
