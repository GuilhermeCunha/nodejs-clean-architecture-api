import { RepostPostProps } from '../../entities/post/post.props'

export type CreateRepostInput = Omit<RepostPostProps, 'id' | 'createdAt'>

export type CreateRepostPostOutput = RepostPostProps

export interface ICreateRepostPostUseCase {
    execute(input: CreateRepostInput): Promise<CreateRepostPostOutput>
}
