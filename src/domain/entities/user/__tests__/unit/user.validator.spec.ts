import {
    USER_USERNAME_MAX_LENGTH,
    USER_USERNAME_MIN_LENGTH,
} from '../../../../constants'
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

    describe('validateUsername', () => {
        describe('username', () => {
            it('should return error is not string', () => {
                const validator = new UserValidator()
                const invalidUsernames = [null, undefined, true, 100]

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                invalidUsernames.forEach((username: any) => {
                    const errors = validator.validateUsername(username)

                    expect(errors).toContainEqual(
                        expect.stringContaining(`should be a string`),
                    )
                })
            })
            it('should return error is empty', () => {
                const validator = new UserValidator()
                const username = ''

                const errors = validator.validateUsername(username)
                expect(errors).toContainEqual(
                    expect.stringContaining(
                        `should have at least ${USER_USERNAME_MIN_LENGTH} character`,
                    ),
                )
            })
            it('should return error is greater than 14', () => {
                const validator = new UserValidator()
                const username = 'greaterthan14charactersusername'

                const errors = validator.validateUsername(username)

                expect(errors).toContainEqual(
                    expect.stringContaining(
                        `should have at most ${USER_USERNAME_MAX_LENGTH} characters`,
                    ),
                )
            })
        })
    })
    describe('validate', () => {
        it('should call validateUsername and append errors', () => {
            const validator = new UserValidator()
            const mockedErrors = [
                'username mocked error 1',
                'username mocked error 2',
            ]
            const input = userPropsFixture()

            const validateUsernameSpy = jest
                .spyOn(validator, 'validateUsername')
                .mockReturnValue(mockedErrors)

            const errors = validator.validate(input)
            expect(validateUsernameSpy).toBeCalledWith(input.username)
            expect(errors).toEqual(
                expect.arrayContaining(
                    mockedErrors.map((error) => `'username' ${error}`),
                ),
            )
        })
        it('should dont return errors if input is valid', () => {
            const validator = new UserValidator()
            const errors = validator.validate(userPropsFixture())
            expect(errors).toHaveLength(0)
        })
        it('should return error when id is not a string', () => {
            const validator = new UserValidator()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const input: any = {
                ...userPropsFixture(),
                id: undefined,
            }

            const errors = validator.validate(input)
            expect(errors).toContainEqual(
                expect.stringContaining(`'id' should be a string`),
            )
        })
    })
})
