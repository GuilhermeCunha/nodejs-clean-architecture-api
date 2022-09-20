import { format } from 'date-fns'
import { MoreThan } from 'typeorm'

export const MoreThanDate = (date: Date) =>
    MoreThan(format(date, 'yyyy-mm-dd HH:MM:ss.l'))
