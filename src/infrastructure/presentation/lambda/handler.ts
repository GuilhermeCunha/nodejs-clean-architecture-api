import serverlessHttp from 'serverless-http'
import { runSeeds } from '../../db/typeorm/seeds'

import app from '../http/routes'

const serverlessHandler = serverlessHttp(app)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any, context: any) => {
    await runSeeds()

    return serverlessHandler(event, context)
}
