import { Entity, Column } from 'typeorm'
@Entity('user')
export class UserEntity {
    @Column({ primary: true })
    id!: string
    @Column({ unique: true })
    username!: string
    @Column()
    createdAt!: Date
}
