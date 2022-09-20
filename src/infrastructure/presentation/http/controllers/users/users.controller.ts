import { Request, Response } from 'express'
import { constants as HTTP_STATUS } from 'http2'
import { ValidationError } from '../../../../../domain/errors/validation.error'
import { ListUserProfileUseCaseFactory } from '../../../../factories/usecases/list-user-profile.usecase.factory'
import { WithErrorHandler } from '../../middlewares/error-handler'

export class UserController {
    @WithErrorHandler()
    async getUserProfile(req: Request, res: Response) {
        const { userId } = req.params

        if (!userId) {
            throw new ValidationError({
                message: `userId should be valid`,
            })
        }

        const result = await ListUserProfileUseCaseFactory.create().execute({
            userId: userId as string,
        })

        return res.status(HTTP_STATUS.HTTP_STATUS_OK).json(result)
    }
}
