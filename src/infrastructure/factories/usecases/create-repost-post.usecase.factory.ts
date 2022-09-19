import { CreateRepostPostUseCase } from '../../../domain/usecases/create-post/create-repost-post.usecase'
import { TypeORMDatabase } from '../../db/typeorm/typeorm-database'
import { UUIDFactory } from '../identifiers/uuid.factory'

import typeormConfig from '../../../config/typeorm'
import { TypeormPostRepository } from '../../db/typeorm/repositories/post.repository'

export class CreateRepostPostUseCaseFactory {
    static create() {
        const typeormDatabase = new TypeORMDatabase(typeormConfig)
        const postRepository = new TypeormPostRepository(typeormDatabase)
        const createRepostPostUseCase = new CreateRepostPostUseCase({
            identifierFactory: new UUIDFactory(),
            postRepository: postRepository,
        })

        return createRepostPostUseCase
    }
}
