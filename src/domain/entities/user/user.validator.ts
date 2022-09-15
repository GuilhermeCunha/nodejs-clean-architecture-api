import { IValidator } from '../../ports/validator'
import { UserProps } from './user.props'

export class UserValidator implements IValidator<UserProps> {
    isAlphanumericOnly(text: string) {
        return new RegExp(/^[a-z0-9]+$/i).test(text)
    }

    validate(input: UserProps): string[] {
        const errors: string[] = []

        if (typeof input.username !== 'string') {
            errors.push(`'username' should be a string`)
        } else {
            if (input.username.length < 1) {
                errors.push(`'username' should have at least one character`)
            }

            if (input.username.length > 14) {
                errors.push(`'username' should have at most 14 characters`)
            }

            if (!this.isAlphanumericOnly(input.username)) {
                errors.push(`'username' should be alphanumeric characters only`)
            }
        }

        return errors
    }
}
