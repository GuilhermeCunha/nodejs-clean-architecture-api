import { Request, Response } from 'express'
import { constants as HTTP_STATUS } from 'http2'
import { PostProps } from '../../../../../domain/entities/post/post.props'
import { ValidationError } from '../../../../../domain/errors/validation.error'
import { CreateOriginalPostUseCaseFactory } from '../../../../factories/usecases/create-original-post.usecase.factory'
import { CreateQuotePostUseCaseFactory } from '../../../../factories/usecases/create-quote-post.usecase.factory'
import { CreateRepostPostUseCaseFactory } from '../../../../factories/usecases/create-repost-post.usecase.factory'
import { WithErrorHandler } from '../../middlewares/error-handler'

export class PostController {
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
