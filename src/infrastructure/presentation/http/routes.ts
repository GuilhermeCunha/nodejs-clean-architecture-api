import express from 'express'
export const httpApp = express()

httpApp.use(express.json())

httpApp.use(express.urlencoded({ extended: true }))

httpApp.get('/ping', (_req, res) => res.send('pong'))

export default httpApp
