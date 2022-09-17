import 'reflect-metadata'
import { DataSource } from 'typeorm'
import CONFIG from '../../../../config/typeorm/sqlite'

export const AppDataSource = new DataSource(CONFIG)
