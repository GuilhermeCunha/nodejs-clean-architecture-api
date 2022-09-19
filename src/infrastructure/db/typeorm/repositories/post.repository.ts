import { endOfDay, startOfDay } from 'date-fns'
import { Between } from 'typeorm'
import { PostProps } from '../../../../domain/entities/post/post.props'
import { IPostRepository } from '../../../../domain/ports/repositories/post-repository'
import { PostEntity } from '../entities/Post'
import { TypeORMDatabase } from '../typeorm-database'

export class TypeormPostRepository implements IPostRepository {
    database: TypeORMDatabase
    constructor(database: TypeORMDatabase) {
        this.database = database
    }
    async createPost(post: PostProps): Promise<PostProps> {
        const database = await this.database.getDatabase()
        const repository = database.getRepository(PostEntity)

        const entity = await repository.create(post as PostEntity)
        const savedEntity = await repository.save(entity)

        return savedEntity as PostProps
    }
    async countPostsByUserInADay(authorId: string, day: Date): Promise<number> {
        const database = await this.database.getDatabase()
        const repository = database.getRepository(PostEntity)

        return await repository.count({
            where: {
                authorId,
                createdAt: Between(startOfDay(day), endOfDay(day)),
            },
        })
    }
    async getPostById(postId: string): Promise<PostProps | null> {
        const database = await this.database.getDatabase()
        const repository = database.getRepository(PostEntity)

        const entity = await repository.findOne({
            where: {
                id: postId,
            },
        })

        return entity as PostProps
    }
}
