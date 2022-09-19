import { constants as HTTP_CONSTANTS } from 'http2'
import { Request, Response } from 'express'
import { ValidationError } from '../../../../domain/errors/validation.error'
import { NotAllowedError } from '../../../../domain/errors/not-allowed.error'
import { NotFoundError } from '../../../../domain/errors/not-found.error'

export async function errorHandler(err: Error, req: Request, res: Response) {
    if (err instanceof ValidationError) {
        return res
            .status(HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST)
            .json(err.errors)
    }

    if (err instanceof NotFoundError) {
        return res.status(HTTP_CONSTANTS.HTTP_STATUS_NOT_FOUND).json({
            message: err.message,
        })
    }

    if (err instanceof NotAllowedError) {
        return res.status(401).json({
            message: err.message,
        })
    }

    return res.status(500).json({
        message:
            'Some unexpected error happened, please try again in a few minutes.',
    })
}

export function WithErrorHandler() {
    return function (
        // eslint-disable-next-line @typescript-eslint/ban-types
        _target: Object,
        _key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptor.value = function (...args: any[]) {
            const next = args[2]
            try {
                const result = originalMethod.apply(this, args)
                if (result && result instanceof Promise) {
                    return result.catch((error) => next(error))
                }
                return result
            } catch (err) {
                console.error('Error', err)
                return next(err)
            }
        }

        return descriptor
    }
}
