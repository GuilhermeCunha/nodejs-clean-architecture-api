import CONFIG from '../../configs'
import routes from './routes'

routes.listen(CONFIG.PORT, () => {
    console.debug(`Posterr API listening on port ${CONFIG.PORT}`)
})
