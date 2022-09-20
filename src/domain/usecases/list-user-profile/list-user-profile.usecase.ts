import { NotFoundError } from '../../errors/not-found.error'
import { IPostRepository } from '../../ports/repositories/post-repository'
import { IUserRepository } from '../../ports/repositories/user-repository'
import {
    IListUserProfileUseCase,
    ListUserProfileInput,
    ListUserProfileOutput,
} from '../../ports/usecases/list-user-profile'

export type ListUserProfileUseCaseProps = {
    postRepository: IPostRepository
    userRepository: IUserRepository
}

export class ListUserProfileUseCase implements IListUserProfileUseCase {
    props: ListUserProfileUseCaseProps
    constructor(props: ListUserProfileUseCaseProps) {
        this.props = props
    }

    async execute(input: ListUserProfileInput): Promise<ListUserProfileOutput> {
        const user = await this.props.userRepository.getUserById(input.userId)

        if (!user) {
            throw new NotFoundError({
                message: `User ${input.userId} was not found`,
            })
        }

        const posts = await this.props.postRepository.countPosts({
            authorId: input.userId,
        })

        return {
            posts,
            username: user.username,
            createdAt: user.createdAt,
        }
    }
}
