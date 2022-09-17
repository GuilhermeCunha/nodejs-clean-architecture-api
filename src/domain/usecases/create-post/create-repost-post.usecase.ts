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

    async validateDailyLimit(author: string): Promise<void> {
        const today = new Date()
        const postsMadeToday =
            await this.props.postRepository.countPostsByUserInADay(
                author,
                today
            )

        if (postsMadeToday > 5) throw new DailyPostLimitError(author)
    }

    async execute(input: CreateRepostInput): Promise<CreateRepostPostOutput> {
        const id = this.props.identifierFactory.create()

        const repostPostProps: RepostPostProps = {
            ...input,
            id,
        }
        const entity = Post.create(repostPostProps)

        const relatedPost = await this.props.postRepository.getPostById(
            repostPostProps.relatedPost
        )
        if (!relatedPost) {
            throw new NotFoundError({
                meessage: `Post ${repostPostProps.relatedPost} was not found`,
            })
        }

        if (relatedPost.author === entity.author) {
            throw new NotAllowedError({
                meessage: `You cannot repost a post created by you`,
            })
        }

        if (relatedPost.type !== 'original' && relatedPost.type !== 'quote') {
            throw new NotAllowedError({
                meessage: `You can only repost posts from the types: original, quote`,
            })
        }

        await this.validateDailyLimit(entity.author)

        await this.props.postRepository.createPost(repostPostProps)

        return repostPostProps
    }
}
