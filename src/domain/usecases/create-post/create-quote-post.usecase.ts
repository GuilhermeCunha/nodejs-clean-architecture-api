import { Post } from '../../entities/post/post.entity'
import { QuotePostProps } from '../../entities/post/post.props'
import { DailyPostLimitError } from '../../errors/daily-post-limit.error'
import { NotAllowedError } from '../../errors/not-allowed.error'
import { NotFoundError } from '../../errors/not-found.error'
import { IIdentifierFactory } from '../../ports/identifier-factory'
import { IPostRepository } from '../../ports/repositories/post-repository'
import {
    CreateQuoteInput,
    CreateQuotePostOutput,
    ICreateQuotePostUseCase,
} from '../../ports/usecases/create-quote-post'

export type CreateQuotePostUseCaseProps = {
    identifierFactory: IIdentifierFactory
    postRepository: IPostRepository
}

export class CreateQuotePostUseCase implements ICreateQuotePostUseCase {
    props: CreateQuotePostUseCaseProps
    constructor(props: CreateQuotePostUseCaseProps) {
        this.props = props
    }

    async validateDailyLimit(authorId: string): Promise<void> {
        const today = new Date()
        const postsMadeToday =
            await this.props.postRepository.countPostsByUserInADay(
                authorId,
                today,
            )

        if (postsMadeToday > 5) throw new DailyPostLimitError(authorId)
    }

    async execute(input: CreateQuoteInput): Promise<CreateQuotePostOutput> {
        const id = this.props.identifierFactory.create()

        const quotePostProps: QuotePostProps = {
            ...input,
            id,
            createdAt: new Date(),
        }
        const entity = Post.create(quotePostProps)

        const relatedPostId = await this.props.postRepository.getPostById(
            quotePostProps.relatedPostId,
        )
        if (!relatedPostId) {
            throw new NotFoundError({
                message: `Related post ${quotePostProps.relatedPostId} was not found`,
            })
        }

        if (
            relatedPostId.type !== 'original' &&
            relatedPostId.type !== 'repost'
        ) {
            throw new NotAllowedError({
                message: `You can only quote posts from the types: original, repost`,
            })
        }

        await this.validateDailyLimit(entity.authorId)

        await this.props.postRepository.createPost(quotePostProps)

        return quotePostProps
    }
}
