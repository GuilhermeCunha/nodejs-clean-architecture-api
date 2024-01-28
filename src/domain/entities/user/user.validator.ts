import {
    USER_USERNAME_MAX_LENGTH,
    USER_USERNAME_MIN_LENGTH,
} from '../../constants'
import { IValidator } from '../../ports/validator'
import { UserProps } from './user.props'

export class UserValidator implements IValidator<UserProps> {
    isAlphanumericOnly(text: string) {
        return new RegExp(/^[a-z0-9]+$/i).test(text)
    }

    validateUsername(username?: string) {
        if (typeof username !== 'string') {
            return ['should be a string']
        }

        const errors: string[] = []

        if (username.length < USER_USERNAME_MIN_LENGTH) {
            errors.push(
                `should have at least ${USER_USERNAME_MIN_LENGTH} character`,
            )
        }

        if (username.length > USER_USERNAME_MAX_LENGTH) {
            errors.push(
                `should have at most ${USER_USERNAME_MAX_LENGTH} characters`,
            )
        }

        if (!this.isAlphanumericOnly(username)) {
            errors.push(`should be alphanumeric characters only`)
        }

        return errors
    }
    validate(input: UserProps): string[] {
        const errors: string[] = []

        if (typeof input.id !== 'string') {
            errors.push(`'id' should be a string`)
        }

        errors.push(
            ...this.validateUsername(input.username).map(
                (error) => `'username' ${error}`,
            ),
        )

        return errors
    }
}
