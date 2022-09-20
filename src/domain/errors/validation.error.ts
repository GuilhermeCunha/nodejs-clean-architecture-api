import { CustomError } from './custom-error'

export class ValidationError extends CustomError {
    name = 'ValidationError'
}
