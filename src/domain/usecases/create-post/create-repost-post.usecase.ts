import { POST_DAILY_LIMIT } from '../../constants'
import { Post } from '../../entities/post/post.entity'
import { RepostPostProps } from '../../entities/post/post.props'
import { DailyPostLimitError } from '../../errors/daily-post-limit.error'
import { NotAllowedError } from '../../errors/not-allowed.error'
import { NotFoundError } from '../../errors/not-found.error'
import { IIdentifierFactory } from '../../ports/identifier-factory'
import { IPostRepository } from '../../ports/repositories/post-repository'
import {
    CreateRepostInput,
    CreateRepostPostOutput,
    ICreateRepostPostUseCase,
} from '../../ports/usecases/create-repost-post'

export type CreateRepostPostUseCaseProps = {
    identifierFactory: IIdentifierFactory
    postRepository: IPostRepository
}

export class CreateRepostPostUseCase implements ICreateRepostPostUseCase {
    props: CreateRepostPostUseCaseProps
    constructor(props: CreateRepostPostUseCaseProps) {
        this.props = props
    }

    async validateDailyLimit(authorId: string): Promise<void> {
        const today = new Date()
        const postsMadeToday =
            await this.props.postRepository.countPostsByUserInADay(
                authorId,
                today,
            )

        if (postsMadeToday > POST_DAILY_LIMIT)
            throw new DailyPostLimitError(authorId)
    }

    async execute(input: CreateRepostInput): Promise<CreateRepostPostOutput> {
        const id = this.props.identifierFactory.create()

        const repostPostProps: RepostPostProps = {
            ...input,
            id,
            createdAt: new Date(),
        }
        const entity = Post.create(repostPostProps)

        const relatedPostId = await this.props.postRepository.getPostById(
            repostPostProps.relatedPostId,
        )
        if (!relatedPostId) {
            throw new NotFoundError({
                message: `Post ${repostPostProps.relatedPostId} was not found`,
            })
        }

        if (
            relatedPostId.type !== 'original' &&
            relatedPostId.type !== 'quote'
        ) {
            throw new NotAllowedError({
                message: `You can only repost posts from the types: original, quote`,
            })
        }

        await this.validateDailyLimit(entity.authorId)

        await this.props.postRepository.createPost(repostPostProps)

        return repostPostProps
    }
}
