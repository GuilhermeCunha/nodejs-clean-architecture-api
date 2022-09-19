import { Entity, Column } from 'typeorm'

@Entity('post')
export class PostEntity {
    @Column({ primary: true })
    id!: string
    @Column()
    type!: string
    @Column()
    authorId!: string
    @Column({
        nullable: true,
        default: null,
    })
    content?: string
    @Column({
        nullable: true,
        default: null,
    })
    relatedPostId!: string
    @Column()
    createdAt!: Date
}
