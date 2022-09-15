import { UserValidator } from '../../user.validator'

describe('UserValidator', () => {
    describe('validate', () => {
        it('should return one error if username is not valid', () => {
            const validator = new UserValidator()
            const invalidUsernames = ['', null, undefined]

            invalidUsernames.forEach((username) => {
                const errors = validator.validate({
                    username,
                    createdAt: new Date(),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)
                expect(errors).toContainEqual(
                    expect.stringContaining('username')
                )
            })
        })
        it('should  dont return errors if input is valid', () => {
            const validator = new UserValidator()
            const errors = validator.validate({
                username: 'Valid Name',
                createdAt: new Date(),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            expect(errors).toHaveLength(0)
        })
    })
})
