import { randomUUID } from 'crypto'
import { TypeORMDatabase } from './typeorm-database'
import CONFIG from '../../../config/typeorm'
import { PostEntity } from './entities/Post'
import { UserEntity } from './entities/User'

const now = new Date('9/18/2022')
export const runSeeds = async () => {
    const typeormDatabase = new TypeORMDatabase(CONFIG)

    const authorId = 'aaaaaaaa-b304-4e86-94ba-96feed7c175f'
    const secondAuthorId = 'bbbbbbbb-b304-4e86-94ba-96feed7c175f'

    const manager = await typeormDatabase.getDatabase()

    const userRepository = manager.getRepository(UserEntity)

    const alreadyRunned = await userRepository.count()

    if (alreadyRunned > 0) {
        console.debug('Seeds already executed')
        return
    }

    console.debug('Running seeds')

    await manager
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
            id: authorId,
            createdAt: now,
            username: 'jhon',
        })
        .orIgnore()
        .execute()
    await manager
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
            id: secondAuthorId,
            createdAt: now,
            username: 'guilherme',
        })
        .orIgnore()
        .execute()
    const originalPostId = 'deb8382d-57b5-4a83-ab7f-d767891e2790'
    await manager
        .createQueryBuilder()
        .insert()
        .into(PostEntity)
        .values({
            id: originalPostId,
            authorId,
            content: 'Example post 1',
            createdAt: now,
            type: 'original',
        })
        .orIgnore()
        .execute()

    const quotePostId = 'e56e54e5-dbed-4fcb-9c42-b354096625f4'
    await manager
        .createQueryBuilder()
        .insert()
        .into(PostEntity)
        .values({
            id: quotePostId,
            authorId,
            content: 'Example post 2',
            createdAt: now,
            type: 'quote',
            relatedPostId: originalPostId,
        })
        .orIgnore()
        .execute()

    await manager
        .createQueryBuilder()
        .insert()
        .into(PostEntity)
        .values({
            id: 'c938ac07-615d-4d3c-b812-4876923a14c4',
            authorId,
            content: 'Example post 3',
            createdAt: now,
            type: 'repost',
            relatedPostId: quotePostId,
        })
        .orIgnore()
        .execute()

    await manager
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
            id: randomUUID(),
            createdAt: now,
            username: 'Guilherme',
        })
        .orIgnore()
        .execute()
    await manager
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
            id: randomUUID(),
            createdAt: now,
            username: 'Gabriel',
        })
        .orIgnore()
        .execute()
    await manager
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
            id: randomUUID(),
            createdAt: now,
            username: 'Daniela',
        })
        .orIgnore()
        .execute()
}
