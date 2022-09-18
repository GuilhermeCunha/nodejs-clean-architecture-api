import { ValidationError } from '../../errors/validation.error'
import { UserProps } from './user.props'
import { UserValidator } from './user.validator'

export class User {
    props: UserProps

    private constructor(props: UserProps) {
        this.props = props
    }

    static create(props: UserProps): User {
        const errors = new UserValidator().validate(props)

        if (errors.length > 0) throw new ValidationError(errors)

        return new User(props)
    }

    get id(): string {
        return this.props.id
    }

    get username(): string {
        return this.props.username
    }
    get createdAt(): Date {
        return this.props.createdAt
    }
}
