import express from 'express'
import { PostController } from './controllers/posts/posts.controller'
export const httpApp = express()

httpApp.use(express.json())

httpApp.use(express.urlencoded({ extended: true }))

httpApp.get('/ping', (_req, res) => res.send('pong'))

new PostController(httpApp)

export default httpApp
