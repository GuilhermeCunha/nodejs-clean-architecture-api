import { Request, Response } from 'express'
import { constants as HTTP_STATUS } from 'http2'
import { get } from 'lodash'
import { PostProps } from '../../../../../domain/entities/post/post.props'
import { ValidationError } from '../../../../../domain/errors/validation.error'
import {
    GetPosts,
    GetPostsResponse,
    PostFilters,
    PostSorts,
} from '../../../../../domain/ports/repositories/post-repository'
import { SortValue } from '../../../../../domain/ports/repositories/shared'
import { CreateOriginalPostUseCaseFactory } from '../../../../factories/usecases/create-original-post.usecase.factory'
import { CreateQuotePostUseCaseFactory } from '../../../../factories/usecases/create-quote-post.usecase.factory'
import { CreateRepostPostUseCaseFactory } from '../../../../factories/usecases/create-repost-post.usecase.factory'
import { ListPostsUseCaseFactory } from '../../../../factories/usecases/list-posts.usecase.factory'
import { WithErrorHandler } from '../../middlewares/error-handler'

const DEFAULT_POST_LIMIT = 10
const DEFAULT_POST_SKIP = 0
const DEFAULT_POST_CREATED_AT_SORT = -1

export class PostController {
    @WithErrorHandler()
    async getMany(
        req: Request<
            any,
            GetPostsResponse,
            any,
            { filters: PostFilters; sorts: { createdAt: SortValue } }
        >,
        res: Response,
    ) {
        const sorts: PostSorts = {
            createdAt: get(
                req,
                'query.sorts.createdAt',
                DEFAULT_POST_CREATED_AT_SORT,
            ),
        }
        const limit = Number(
            get(req, 'query.pagination.limit', DEFAULT_POST_LIMIT),
        )
        const skip = Number(
            get(req, 'query.pagination.skip', DEFAULT_POST_SKIP),
        )

        const createdAfter = get(req.query, 'filters.createdAfter')
        const createdBefore = get(req.query, 'filters.createdBefore')
        const shouldExpandRelatedPost =
            get(req.query, 'expands.relatedPost') === 'true'

        const filters: PostFilters = {}

        if (createdAfter) {
            filters['createdAfter'] = createdAfter
        }

        if (createdBefore) {
            filters['createdBefore'] = createdBefore
        }

        const input: GetPosts = {
            pagination: {
                limit,
                skip,
            },
            filters,
            sorts,
            expands: {
                relatedPost: shouldExpandRelatedPost,
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
                    req.body,
                )

            return res.status(HTTP_STATUS.HTTP_STATUS_OK).json({ post })
        }

        if (type === 'quote') {
            const post = await CreateQuotePostUseCaseFactory.create().execute(
                req.body,
            )

            return res.status(HTTP_STATUS.HTTP_STATUS_OK).json({ post })
        }
        if (type === 'repost') {
            const post = await CreateRepostPostUseCaseFactory.create().execute(
                req.body,
            )

            return res.status(HTTP_STATUS.HTTP_STATUS_OK).json({ post })
        }

        throw new ValidationError(['body.type should be a valid string'])
    }
}
