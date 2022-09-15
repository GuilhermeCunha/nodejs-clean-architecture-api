import { UserValidator } from '../../user.validator'
import { userPropsFixture } from '../fixtures/user.props.fixture'

describe('UserValidator', () => {
    describe('isAlphanumericOnly', () => {
        it('should return true if text is alphanumeric', () => {
            const validator = new UserValidator()
            const input = 'Ac123'
            expect(validator.isAlphanumericOnly(input)).toBe(true)
        })

        it('should return true if text has symbols', () => {
            const validator = new UserValidator()
            const input = 'abc123!'
            expect(validator.isAlphanumericOnly(input)).toBe(false)
        })
    })
    describe('validate', () => {
        describe('username', () => {
            it('should return error if username is not string', () => {
                const validator = new UserValidator()
                const invalidUsernames = [null, undefined, true, 100]

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                invalidUsernames.forEach((username: any) => {
                    const errors = validator.validate(
                        userPropsFixture({
                            username,
                        })
                    )
                    expect(errors).toContainEqual(
                        expect.stringContaining(`'username' should be a string`)
                    )
                })
            })
            it('should return error if username is empty', () => {
                const validator = new UserValidator()
                const username = ''

                const errors = validator.validate(
                    userPropsFixture({
                        username,
                    })
                )
                expect(errors).toContainEqual(
                    expect.stringContaining(
                        `'username' should have at least one character`
                    )
                )
            })
            it('should return error if username is greater than 14', () => {
                const validator = new UserValidator()
                const username = 'greaterthan14charactersusername'

                const errors = validator.validate(
                    userPropsFixture({
                        username,
                    })
                )
                expect(errors).toContainEqual(
                    expect.stringContaining(
                        `'username' should have at most 14 characters`
                    )
                )
            })
        })

        it('should  dont return errors if input is valid', () => {
            const validator = new UserValidator()
            const errors = validator.validate({
                username: 'Valid',
                createdAt: new Date(),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            expect(errors).toHaveLength(0)
        })
    })
})
