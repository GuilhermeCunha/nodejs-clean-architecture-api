import { Request, Response } from 'express'
import { constants as HTTP_STATUS } from 'http2'
import { get, isNil, omitBy } from 'lodash'
import { PostProps } from '../../../../../domain/entities/post/post.props'
import { ValidationError } from '../../../../../domain/errors/validation.error'
import {
    GetPosts,
    PostSorts,
} from '../../../../../domain/ports/repositories/post-repository'
import { SortValue } from '../../../../../domain/ports/repositories/shared'
import { CreateOriginalPostUseCaseFactory } from '../../../../factories/usecases/create-original-post.usecase.factory'
import { CreateQuotePostUseCaseFactory } from '../../../../factories/usecases/create-quote-post.usecase.factory'
import { CreateRepostPostUseCaseFactory } from '../../../../factories/usecases/create-repost-post.usecase.factory'
import { ListPostsUseCaseFactory } from '../../../../factories/usecases/list-posts.usecase.factory'
import { WithErrorHandler } from '../../middlewares/error-handler'

export class PostController {
    @WithErrorHandler()
    async getMany(req: Request, res: Response) {
        const sorts: PostSorts = {
            createdAt: Number(
                get(req, 'query.sorts.createdAt', -1)
            ) as SortValue,
        }
        const input: GetPosts = {
            pagination: {
                limit: Number(get(req, 'query.pagination.limit')) || 10,
                skip: Number(get(req, 'query.pagination.skip')) || 0,
            },
            filters: omitBy(
                {
                    authorId: get(req, 'query.filters.authorId'),
                    createdAfter:
                        get(req, 'query.filters.createdAfter') &&
                        new Date(get(req, 'query.filters.createdAfter')),
                    createdBefore:
                        get(req, 'query.filters.createdBefore') &&
                        new Date(get(req, 'query.filters.createdBefore')),
                },
                isNil
            ),
            sorts,
            expands: {
                relatedPost: get(req, 'query.expands.relatedPost') === 'true',
            },
        }

        const result = await ListPostsUseCaseFactory.create().execute(input)

        return res.status(HTTP_STATUS.HTTP_STATUS_OK).json(result)
    }
    @WithErrorHandler()
    async create(req: Request, res: Response) {
        const { type } = req.body as PostProps

        if (type === 'original') {
            const post =
                await CreateOriginalPostUseCaseFactory.create().execute(
                    req.body
                )

            return res.status(HTTP_STATUS.HTTP_STATUS_OK).json({ post })
        }

        if (type === 'quote') {
            const post = await CreateQuotePostUseCaseFactory.create().execute(
                req.body
            )

            return res.status(HTTP_STATUS.HTTP_STATUS_OK).json({ post })
        }
        if (type === 'repost') {
            const post = await CreateRepostPostUseCaseFactory.create().execute(
                req.body
            )

            return res.status(HTTP_STATUS.HTTP_STATUS_OK).json({ post })
        }

        throw new ValidationError(['body.type should be a valid string'])
    }
}
