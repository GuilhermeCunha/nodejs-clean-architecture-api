import { IValidator } from '../../ports/validator'
import { UserProps } from './user.props'

export class UserValidator implements IValidator<UserProps> {
    isAlphanumericOnly(text: string) {
        return new RegExp(/^[a-z0-9]+$/i).test(text)
    }

    validateUsername(username: string) {
        const errors: string[] = []

        if (typeof username !== 'string') {
            errors.push(`should be a string`)
        } else {
            if (username.length < 1) {
                errors.push(`should have at least one character`)
            }

            if (username.length > 14) {
                errors.push(`should have at most 14 characters`)
            }

            if (!this.isAlphanumericOnly(username)) {
                errors.push(`should be alphanumeric characters only`)
            }
        }

        return errors
    }
    validate(input: UserProps): string[] {
        const errors: string[] = []

        errors.push(
            ...this.validateUsername(input.username).map(
                (error) => `'username' ${error}`
            )
        )

        return errors
    }
}
