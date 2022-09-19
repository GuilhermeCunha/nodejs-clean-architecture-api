import CONFIG from '../../../config'
import { runMySQLSeeds } from '../../db/typeorm/mysql/seeds'
import { runSQLiteSeeds } from '../../db/typeorm/sqlite/seeds'
import routes from './routes'

routes.listen(CONFIG.PORT, async () => {
    if (process.env.DATABASE_TYPE === 'mysql') {
        await runMySQLSeeds()
    }
    if (process.env.DATABASE_TYPE === 'sqlite') {
        await runSQLiteSeeds()
    }

    console.debug(`Posterr API listening on port ${CONFIG.PORT}`)
})
