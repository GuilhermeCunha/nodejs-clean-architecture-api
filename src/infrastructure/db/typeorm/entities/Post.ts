import { Entity, Column } from 'typeorm'

@Entity('post')
export class PostEntity {
    @Column({ primary: true })
    id!: string
    @Column()
    type!: string
    @Column()
    authorId!: string
    @Column()
    content: undefined
    @Column()
    relatedPost!: string
    @Column()
    createdAt!: Date
}
