import { ValidationError } from '../../../../errors/validation.error'
import { User } from '../../user.entity'
import { UserValidator } from '../../user.validator'
import { userPropsFixture } from '../fixtures/user.props.fixture'

describe('User', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
    describe('create', () => {
        it('should call UserValidator.validate function', () => {
            const input = userPropsFixture()
            const validateSpy = jest.spyOn(UserValidator.prototype, 'validate')
            try {
                User.create(input)
            } catch {
                //
            }

            expect(validateSpy).toBeCalledWith(input)
        })
        it('should throw ValidationError if validation return errors', () => {
            const input = userPropsFixture()
            jest.spyOn(UserValidator.prototype, 'validate').mockReturnValue([
                'error',
            ])

            expect(() => User.create(input)).toThrow(ValidationError)
        })

        it('should return a instance of User if input is valid', () => {
            jest.spyOn(UserValidator.prototype, 'validate').mockReturnValue([])
            const user = User.create(userPropsFixture())
            expect(user instanceof User).toBe(true)
        })
    })
    describe('get username()', () => {
        it('should return the username from props', () => {
            const input = userPropsFixture()
            jest.spyOn(UserValidator.prototype, 'validate').mockReturnValue([])
            const user = User.create(input)

            expect(user.username).toEqual(input.username)
        })
    })
    describe('get createdAt()', () => {
        it('should return the createdAt from props', () => {
            const input = userPropsFixture()
            jest.spyOn(UserValidator.prototype, 'validate').mockReturnValue([])
            const user = User.create(input)

            expect(user.createdAt).toEqual(input.createdAt)
        })
    })
})
