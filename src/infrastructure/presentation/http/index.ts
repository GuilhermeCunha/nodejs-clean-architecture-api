import CONFIG from '../../../config'
import { runSeeds } from '../../db/typeorm/seeds'
import routes from './routes'

routes.listen(CONFIG.PORT, async () => {
    await runSeeds()
    console.debug(`Posterr API listening on port ${CONFIG.PORT}`)
})
