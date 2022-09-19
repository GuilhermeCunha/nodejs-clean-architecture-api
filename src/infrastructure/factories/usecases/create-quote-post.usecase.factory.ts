import { CreateQuotePostUseCase } from '../../../domain/usecases/create-post/create-quote-post.usecase'
import { TypeORMDatabase } from '../../db/typeorm/typeorm-database'
import { UUIDFactory } from '../identifiers/uuid.factory'

import typeormConfig from '../../../config/typeorm'
import { TypeormPostRepository } from '../../db/typeorm/repositories/post.repository'

export class CreateQuotePostUseCaseFactory {
    static create() {
        const typeormDatabase = new TypeORMDatabase(typeormConfig)
        const postRepository = new TypeormPostRepository(typeormDatabase)
        const createQuotePostUseCase = new CreateQuotePostUseCase({
            identifierFactory: new UUIDFactory(),
            postRepository: postRepository,
        })

        return createQuotePostUseCase
    }
}
