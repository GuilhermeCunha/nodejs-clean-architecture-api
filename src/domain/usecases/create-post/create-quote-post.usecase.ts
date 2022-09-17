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

    async validateDailyLimit(author: string): Promise<void> {
        const today = new Date()
        const postsMadeToday =
            await this.props.postRepository.countPostsByUserInADay(
                author,
                today
            )

        if (postsMadeToday > 5) throw new DailyPostLimitError(author)
    }

    async execute(input: CreateQuoteInput): Promise<CreateQuotePostOutput> {
        const id = this.props.identifierFactory.create()

        const quotePostProps: QuotePostProps = {
            ...input,
            id,
            createdAt: new Date(),
        }
        const entity = Post.create(quotePostProps)

        const relatedPost = await this.props.postRepository.getPostById(
            quotePostProps.relatedPost
        )
        if (!relatedPost) {
            throw new NotFoundError({
                meessage: `Post ${quotePostProps.relatedPost} was not found`,
            })
        }

        if (relatedPost.type !== 'original' && relatedPost.type !== 'repost') {
            throw new NotAllowedError({
                meessage: `You can only quote posts from the types: original, repost`,
            })
        }

        await this.validateDailyLimit(entity.author)

        await this.props.postRepository.createPost(quotePostProps)

        return quotePostProps
    }
}
