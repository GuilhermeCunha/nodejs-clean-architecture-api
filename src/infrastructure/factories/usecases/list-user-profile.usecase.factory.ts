import { ListUserProfileUseCase } from '../../../domain/usecases/list-user-profile/list-user-profile.usecase'
import { TypeORMDatabase } from '../../db/typeorm/typeorm-database'

import typeormConfig from '../../../config/typeorm'
import { TypeormPostRepository } from '../../db/typeorm/repositories/post.repository'
import { TypeormUserRepository } from '../../db/typeorm/repositories/user.repository'

export class ListUserProfileUseCaseFactory {
    static create() {
        const typeormDatabase = new TypeORMDatabase(typeormConfig)
        const postRepository = new TypeormPostRepository(typeormDatabase)
        const userRepository = new TypeormUserRepository(typeormDatabase)

        const listUserProfileUseCase = new ListUserProfileUseCase({
            postRepository: postRepository,
            userRepository,
        })

        return listUserProfileUseCase
    }
}
