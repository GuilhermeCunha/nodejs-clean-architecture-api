import { PostProps } from '../../../../domain/entities/post/post.props'
import { ValidationError } from '../../../../domain/errors/validation.error'
import { CreateOriginalPostUseCaseFactory } from '../../../factories/usecases/create-original-post.usecase.factory'
import { CreateQuotePostUseCaseFactory } from '../../../factories/usecases/create-quote-post.usecase.factory'
import { CreateRepostPostUseCaseFactory } from '../../../factories/usecases/create-repost-post.usecase.factory'

// Just an example of what a handler would look like
export const handler = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventPayload: any = {
        //
    }
    const { type } = eventPayload as PostProps

    if (type === 'original') {
        await CreateOriginalPostUseCaseFactory.create().execute(eventPayload)
    }

    if (type === 'quote') {
        return await CreateQuotePostUseCaseFactory.create().execute(
            eventPayload
        )
    }
    if (type === 'repost') {
        return await CreateRepostPostUseCaseFactory.create().execute(
            eventPayload
        )
    }

    throw new ValidationError(['body.type should be a valid string'])
}

export default handler
