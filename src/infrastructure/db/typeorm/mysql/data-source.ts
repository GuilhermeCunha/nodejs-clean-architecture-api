import 'reflect-metadata'
import { DataSource } from 'typeorm'
import CONFIG from '../../../../config/typeorm/mysql'

export const AppDataSource = new DataSource(CONFIG)
