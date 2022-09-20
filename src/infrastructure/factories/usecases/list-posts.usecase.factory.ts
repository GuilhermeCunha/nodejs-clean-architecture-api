import { ListPostsUseCase } from '../../../domain/usecases/list-posts/list-posts.usecase'
import { TypeORMDatabase } from '../../db/typeorm/typeorm-database'

import typeormConfig from '../../../config/typeorm'
import { TypeormPostRepository } from '../../db/typeorm/repositories/post.repository'

export class ListPostsUseCaseFactory {
    static create() {
        const typeormDatabase = new TypeORMDatabase(typeormConfig)
        const postRepository = new TypeormPostRepository(typeormDatabase)
        const listPostsUseCase = new ListPostsUseCase({
            postRepository: postRepository,
        })

        return listPostsUseCase
    }
}
