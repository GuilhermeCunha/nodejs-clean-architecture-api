import { QuotePostProps } from '../../entities/post/post.props'

export type CreateQuoteInput = Omit<QuotePostProps, 'id'>

export type CreateQuotePostOutput = QuotePostProps

export interface ICreateQuotePostUseCase {
    execute(input: CreateQuoteInput): Promise<CreateQuotePostOutput>
}
