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

        repository.create(post as PostEntity)
    }
    countPostsByUserInADay(userId: string, day: Date): Promise<number> {
        throw new Error('Method not implemented.')
    }
    getPostById(postId: string): Promise<PostProps | null> {
        throw new Error('Method not implemented.')
    }
}
