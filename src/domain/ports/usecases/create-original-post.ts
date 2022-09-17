import { OriginalPostProps } from '../../entities/post/post.props'

export type CreateOriginalInput = Omit<OriginalPostProps, 'id'>

export type CreateOriginalPostOutput = OriginalPostProps

export interface ICreateOriginalPostUseCase {
    execute(input: CreateOriginalInput): Promise<CreateOriginalPostOutput>
}
