import { IValidator } from '../../ports/validator'
import { POST_TYPES } from '../../constants'
import {
    OriginalPostProps,
    PostProps,
    PostType,
    QuotePostProps,
    RepostPostProps,
} from './post.props'

export class PostValidator implements IValidator<PostProps> {
    validateRepostPost(input: RepostPostProps) {
        const errors: string[] = []

        if (input.type !== 'repost') {
            errors.push(`'type' should be 'repost'`)
        }

        errors.push(...this.validateId(input.id))
        errors.push(...this.validateRelatedPost(input.relatedPostId))
        errors.push(...this.validateAuthor(input.authorId))

        if (typeof input.content !== 'undefined') {
            errors.push(`'content' should be undefined`)
        }

        return errors
    }

    validateOriginalPost(input: OriginalPostProps) {
        const errors: string[] = []

        if (input.type !== 'original') {
            errors.push(`'type' should be 'original'`)
        }

        errors.push(...this.validateId(input.id))
        errors.push(...this.validateAuthor(input.authorId))
        errors.push(...this.validateContent(input.authorId))

        if (typeof input.relatedPostId !== 'undefined') {
            errors.push(`'relatedPostId' should be undefined`)
        }

        return errors
    }

    validateQuotePost(input: QuotePostProps) {
        const errors: string[] = []

        if (input.type !== 'quote') {
            errors.push(`'type' should be 'quote'`)
        }

        errors.push(...this.validateId(input.id))
        errors.push(...this.validateAuthor(input.authorId))
        errors.push(...this.validateContent(input.authorId))
        errors.push(...this.validateRelatedPost(input.relatedPostId))

        return errors
    }

    validateContent(content: string) {
        const errors: string[] = []

        if (!content || content.length < 1) {
            errors.push(`'content' should have at least one character`)
        } else if (content.length > 777) {
            errors.push(`'content' should have at most 777 characters`)
        }

        return errors
    }

    validateId(id: string) {
        const errors: string[] = []

        if (typeof id !== 'string') {
            errors.push(`'id' should be a string`)
        }

        return errors
    }

    validateType(type?: PostType) {
        const errors: string[] = []

        if (!POST_TYPES.includes(type as PostType)) {
            errors.push(
                `'type' should have one of the following values: ${POST_TYPES.join(
                    ','
                )}`
            )
        }

        return errors
    }

    validateRelatedPost(relatedPostId?: string) {
        const errors: string[] = []

        if (typeof relatedPostId !== 'string') {
            errors.push(`'relatedPostId' should be a string`)
        }

        return errors
    }

    validateAuthor(authorId?: string) {
        const errors: string[] = []
        if (typeof authorId !== 'string') {
            errors.push(`'authorId' should be a string`)
        }
        return errors
    }

    validate(input: PostProps): string[] {
        const errors: string[] = []

        errors.push(...this.validateType(input.type))

        if (input.type === 'repost') {
            return this.validateRepostPost(input)
        } else if (input.type === 'original') {
            return this.validateOriginalPost(input)
        } else if (input.type === 'quote') {
            return this.validateQuotePost(input)
        }

        return errors
    }
}
