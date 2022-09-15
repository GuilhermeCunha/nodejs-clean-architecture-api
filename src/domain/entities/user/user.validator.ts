import { IValidator } from '../../ports/validator'
import { UserProps } from './user.props'

export class UserValidator implements IValidator<UserProps> {
    validate(input: UserProps): string[] {
        const errors: string[] = []

        if (!input.username) {
            errors.push(`Invalid 'username'.`)
        }

        return errors
    }
}
