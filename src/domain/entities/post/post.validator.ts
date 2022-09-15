import { IValidator } from '../../ports/validator'
import { UserValidator } from '../user/user.validator'
import { POST_TYPES } from './constants'
import { PostProps } from './post.props'

export class PostValidator implements IValidator<PostProps> {
    validate(input: PostProps): string[] {
        const errors: string[] = []

        if (typeof input.content !== 'string') {
            errors.push(`'content' should be a string`)
        } else {
            if (input.content.length < 1) {
                errors.push(`'content' should have at least one character`)
            }

            if (input.content.length > 777) {
                errors.push(`'content' should have at most 777 characters`)
            }
        }

        if (!POST_TYPES.includes(input.type)) {
            errors.push(
                `'type' should have one of the following values: ${POST_TYPES.join(
                    ','
                )}`
            )
        }

        errors.push(
            ...new UserValidator()
                .validateUsername(input.author)
                .map((error) => `'author' ${error}`)
        )

        return errors
    }
}
