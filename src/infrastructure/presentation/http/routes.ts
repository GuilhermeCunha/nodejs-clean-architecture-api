import express, { NextFunction, Request, Response } from 'express'
import { PostController } from './controllers/posts/posts.controller'
import { errorHandler } from './middlewares/error-handler'
export const httpApp = express()

httpApp.use(express.json())

httpApp.use(express.urlencoded({ extended: true }))

httpApp.get('/ping', (_req, res) => res.send('pong'))

const postController = new PostController()

httpApp.post('/posts', postController.create.bind(postController))
httpApp.get('/posts', postController.getMany.bind(postController))

httpApp.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    return errorHandler(err, req, res, next)
})

export default httpApp
