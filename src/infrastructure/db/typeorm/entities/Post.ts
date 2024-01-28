import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import {
    POST_MAX_CONTENT_LENGTH,
    POST_TYPES,
} from '../../../../domain/constants'

@Entity('post')
export class PostEntity {
    @Column({ primary: true })
    id!: string

    @Column({ enum: POST_TYPES })
    type!: string

    @Column()
    authorId!: string
    @Column({
        nullable: true,
        default: null,
        length: POST_MAX_CONTENT_LENGTH,
    })
    content?: string

    @Column({
        nullable: true,
        default: null,
    })
    relatedPostId!: string

    @ManyToOne(() => PostEntity, (user) => user.relations)
    @JoinColumn({ name: 'relatedPostId' })
    relatedPost?: PostEntity

    @OneToMany(() => PostEntity, (user) => user.relatedPost)
    relations?: PostEntity

    @Column()
    createdAt!: Date
}
