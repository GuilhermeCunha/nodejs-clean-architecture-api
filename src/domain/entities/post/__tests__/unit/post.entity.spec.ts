import { ValidationError } from '../../../../errors/validation.error'
import { Post } from '../../post.entity'
import { PostValidator } from '../../post.validator'
import { postPropsFixture } from '../fixtures/post.props.fixture'

describe('Post', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
    describe('create', () => {
        it('should call PostValidator.validate function', () => {
            const input = postPropsFixture()
            const validateSpy = jest.spyOn(PostValidator.prototype, 'validate')
            try {
                Post.create(input)
            } catch {
                //
            }

            expect(validateSpy).toBeCalledWith(input)
        })
        it('should throw ValidationError if validation return errors', () => {
            const input = postPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([
                'error',
            ])

            expect(() => Post.create(input)).toThrow(ValidationError)
        })

        it('should return a instance of Post if input is valid', () => {
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(postPropsFixture())
            expect(post instanceof Post).toBe(true)
        })
    })
    describe('get author()', () => {
        it('should return the author from props', () => {
            const input = postPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.author).toEqual(input.author)
        })
    })
    describe('get type()', () => {
        it('should return the type from props', () => {
            const input = postPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.type).toEqual(input.type)
        })
    })
    describe('get content()', () => {
        it('should return the content from props', () => {
            const input = postPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.content).toEqual(input.content)
        })
    })
    describe('get createdAt()', () => {
        it('should return the createdAt from props', () => {
            const input = postPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.createdAt).toEqual(input.createdAt)
        })
    })
})