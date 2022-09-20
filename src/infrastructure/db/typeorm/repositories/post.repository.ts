import { endOfDay, startOfDay } from 'date-fns'
import { isNil, omitBy } from 'lodash'
import { Between, LessThan, MoreThan } from 'typeorm'
import { PostProps } from '../../../../domain/entities/post/post.props'
import {
    GetPosts,
    GetPostsResponse,
    IPostRepository,
    PostFilters,
} from '../../../../domain/ports/repositories/post-repository'
import { PostEntity } from '../entities/Post'
import { TypeORMDatabase } from '../typeorm-database'

export class TypeormPostRepository implements IPostRepository {
    database: TypeORMDatabase
    constructor(database: TypeORMDatabase) {
        this.database = database
    }

    parseFilters(filters: PostFilters) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedFilters: any = {
            createdAt: undefined,
            authorId: filters.authorId,
        }

        if (filters.createdAfter && filters.createdBefore) {
            parsedFilters.createdAt = Between(
                filters.createdAfter,
                filters.createdBefore
            )
        } else if (filters.createdAfter) {
            parsedFilters.createdAt = MoreThan(filters.createdAfter)
        } else if (filters.createdBefore) {
            parsedFilters.createdAt = LessThan(filters.createdBefore)
        }

        return omitBy(parsedFilters, isNil)
    }
    async getPosts({
        filters = {},
        pagination,
        sorts = {},
        expands = {},
    }: GetPosts): Promise<GetPostsResponse> {
        const parsedFilters = this.parseFilters(filters)

        const database = await this.database.getDatabase()
        const repository = database.getRepository(PostEntity)

        const [results, total] = await repository.findAndCount({
            where: parsedFilters,
            skip: pagination.skip,
            take: pagination.skip,
            order: sorts,
            relations: Object.entries(expands)
                .filter(([, value]) => !!value)
                .map(([key]) => key),
        })

        return {
            results: results as PostProps[],
            pagination: {
                ...pagination,
                total,
            },
        }
    }
    async countPosts(filters: PostFilters): Promise<number> {
        const parsedFilters = this.parseFilters(filters)

        const database = await this.database.getDatabase()
        const repository = database.getRepository(PostEntity)

        return repository.count({
            where: parsedFilters,
        })
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
