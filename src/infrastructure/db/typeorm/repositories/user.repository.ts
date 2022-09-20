import { UserProps } from '../../../../domain/entities/user/user.props'
import {
    IUserRepository,
} from '../../../../domain/ports/repositories/user-repository'
import { UserEntity } from '../entities/User'
import { TypeORMDatabase } from '../typeorm-database'

export class TypeormUserRepository implements IUserRepository {
    database: TypeORMDatabase
    constructor(database: TypeORMDatabase) {
        this.database = database
    }

    async getUserById(userId: string): Promise<UserProps | null> {
        const database = await this.database.getDatabase()
        const repository = database.getRepository(UserEntity)

        const entity = await repository.findOne({
            where: {
                id: userId,
            },
        })

        return entity as UserProps
    }
}
