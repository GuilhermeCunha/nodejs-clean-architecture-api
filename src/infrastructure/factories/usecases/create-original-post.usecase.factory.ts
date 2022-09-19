import { CreateOriginalPostUseCase } from '../../../domain/usecases/create-post/create-original-post.usecase'
import { TypeORMDatabase } from '../../db/typeorm/typeorm-database'
import { UUIDFactory } from '../identifiers/uuid.factory'

import typeormConfig from '../../../config/typeorm'
import { TypeormPostRepository } from '../../db/typeorm/repositories/post.repository'

export class CreateOriginalPostUseCaseFactory {
    static create() {
        const typeormDatabase = new TypeORMDatabase(typeormConfig)
        const postRepository = new TypeormPostRepository(typeormDatabase)
        const createOriginalPostUseCase = new CreateOriginalPostUseCase({
            identifierFactory: new UUIDFactory(),
            postRepository: postRepository,
        })

        return createOriginalPostUseCase
    }
}
