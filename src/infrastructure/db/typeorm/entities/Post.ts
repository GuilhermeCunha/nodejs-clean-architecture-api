import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

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

    @ManyToOne(() => PostEntity, (user) => user.relations)
    @JoinColumn({ name: 'relatedPostId' })
    relatedPost?: PostEntity

    @OneToMany(() => PostEntity, (user) => user.relatedPost)
    relations?: PostEntity

    @Column()
    createdAt!: Date
}
