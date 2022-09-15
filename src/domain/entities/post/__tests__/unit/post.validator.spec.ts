import { UserValidator } from '../../../user/user.validator'
import { POST_TYPES } from '../../constants'
import { PostValidator } from '../../post.validator'
import { postPropsFixture } from '../fixtures/post.props.fixture'

describe('PostValidator', () => {
    describe('validate', () => {
        describe('author', () => {
            it('should call UserValidator.validateUsername and append errors', () => {
                const validator = new PostValidator()
                const mockedErrors = ['mocked error 1', 'mocked error 2']
                const input = postPropsFixture()

                const validateUsernameSpy = jest
                    .spyOn(UserValidator.prototype, 'validateUsername')
                    .mockReturnValue(mockedErrors)

                const errors = validator.validate(input)
                expect(validateUsernameSpy).toBeCalledWith(input.author)
                expect(errors).toEqual(
                    expect.arrayContaining(
                        mockedErrors.map((error) => `'author' ${error}`)
                    )
                )
                validateUsernameSpy.mockRestore()
            })
        })
        describe('content', () => {
            it('should return error if content is not string', () => {
                const validator = new PostValidator()
                const invalidContents = [null, undefined, true, 100]

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                invalidContents.forEach((content: any) => {
                    const errors = validator.validate(
                        postPropsFixture({
                            content,
                        })
                    )
                    expect(errors).toContainEqual(
                        expect.stringContaining(`'content' should be a string`)
                    )
                })
            })
            it('should return error if content is empty', () => {
                const validator = new PostValidator()
                const input = postPropsFixture({
                    content: '',
                })
                const errors = validator.validate(input)
                expect(errors).toContainEqual(
                    expect.stringContaining(
                        `'content' should have at least one character`
                    )
                )
            })
            it('should return error if content is greater than 777', () => {
                const validator = new PostValidator()
                const bigString = new Array(779).join('-')

                const input = postPropsFixture({
                    content: bigString,
                })

                const errors = validator.validate(input)

                expect(errors).toContainEqual(
                    expect.stringContaining(
                        `'content' should have at most 777 characters`
                    )
                )
            })
        })

        describe('type', () => {
            it('should return error if content is not string', () => {
                const validator = new PostValidator()

                const errors = validator.validate(
                    postPropsFixture({
                        type: null,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any)
                )
                expect(errors).toContainEqual(
                    expect.stringContaining(
                        `'type' should have one of the following values: ${POST_TYPES.join(
                            ','
                        )}`
                    )
                )
            })

            it('should not return errors if type is valid', () => {
                const validator = new PostValidator()

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                POST_TYPES.forEach((type) => {
                    const errors = validator.validate(
                        postPropsFixture({
                            type,
                        })
                    )
                    expect(errors).not.toContainEqual(
                        expect.stringContaining(
                            `'type' should have one of the following values`
                        )
                    )
                })
            })
        })

        it('should dont return errors if input is valid', () => {
            const validator = new PostValidator()
            const errors = validator.validate(postPropsFixture())
            expect(errors).toHaveLength(0)
        })
    })
})