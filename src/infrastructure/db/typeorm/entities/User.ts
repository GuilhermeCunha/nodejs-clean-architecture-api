import { Entity, Column } from 'typeorm'
import { USER_USERNAME_MAX_LENGTH } from '../../../../domain/constants'
@Entity('user')
export class UserEntity {
    @Column({ primary: true })
    id!: string

    @Column({ unique: true, length: USER_USERNAME_MAX_LENGTH })
    username!: string

    @Column()
    createdAt!: Date
}
