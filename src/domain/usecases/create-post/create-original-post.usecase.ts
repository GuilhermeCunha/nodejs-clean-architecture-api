import { Post } from '../../entities/post/post.entity'
import { OriginalPostProps } from '../../entities/post/post.props'
import { DailyPostLimitError } from '../../errors/daily-post-limit.error'
import { IIdentifierFactory } from '../../ports/identifier-factory'
import { IPostRepository } from '../../ports/repositories/post-repository'
import {
    CreateOriginalInput,
    CreateOriginalPostOutput,
    ICreateOriginalPostUseCase,
} from '../../ports/usecases/create-original-post'

export type CreateOriginalPostUseCaseProps = {
    identifierFactory: IIdentifierFactory
    postRepository: IPostRepository
}

export class CreateOriginalPostUseCase implements ICreateOriginalPostUseCase {
    props: CreateOriginalPostUseCaseProps
    constructor(props: CreateOriginalPostUseCaseProps) {
        this.props = props
    }

    async validateDailyLimit(authorId: string): Promise<void> {
        const today = new Date()
        const postsMadeToday =
            await this.props.postRepository.countPostsByUserInADay(
                authorId,
                today
            )

        if (postsMadeToday > 5) throw new DailyPostLimitError(authorId)
    }

    async execute(
        input: CreateOriginalInput
    ): Promise<CreateOriginalPostOutput> {
        const id = this.props.identifierFactory.create()

        const originalPostProps: OriginalPostProps = {
            ...input,
            id,
            createdAt: new Date(),
        }
        const entity = Post.create(originalPostProps)

        await this.validateDailyLimit(entity.authorId)

        await this.props.postRepository.createPost(originalPostProps)

        return originalPostProps
    }
}
