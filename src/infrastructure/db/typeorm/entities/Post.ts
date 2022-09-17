import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'

import { UserEntity } from './User'

@Entity()
export class PostEntity {
    @Column({ primary: true })
    username!: string

    @Column()
    createdAt!: Date

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user!: UserEntity

    @ManyToOne(() => PostEntity, (parent) => parent.nestedPosts, {
        nullable: true,
    })
    relatedPost!: PostEntity

    @OneToMany(() => PostEntity, (parent) => parent.relatedPost)
    nestedPosts!: PostEntity
}
