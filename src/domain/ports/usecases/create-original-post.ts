import { OriginalPostProps } from '../../entities/post/post.props'

export type CreateOriginalInput = Omit<OriginalPostProps, 'id' | 'createdAt'>

export type CreateOriginalPostOutput = OriginalPostProps

export interface ICreateOriginalPostUseCase {
    execute(input: CreateOriginalInput): Promise<CreateOriginalPostOutput>
}
