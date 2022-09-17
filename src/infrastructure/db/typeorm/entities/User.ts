import { Entity, Column, OneToMany } from 'typeorm'
import { PostEntity } from './Post'

@Entity()
export class UserEntity {
    @Column({ primary: true })
    username!: string

    @Column()
    createdAt!: Date

    @OneToMany(() => PostEntity, (photo) => photo.user)
    posts!: PostEntity[]
}
