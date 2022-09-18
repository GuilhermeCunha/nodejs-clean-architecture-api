import { ValidationError } from '../../../../errors/validation.error'
import { Post } from '../../post.entity'
import { PostValidator } from '../../post.validator'
import { originalPostPropsFixture } from '../fixtures/post.props.fixture'

describe('Post', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
    describe('create', () => {
        it('should call PostValidator.validate function', () => {
            const input = originalPostPropsFixture()
            const validateSpy = jest.spyOn(PostValidator.prototype, 'validate')
            try {
                Post.create(input)
            } catch {
                //
            }

            expect(validateSpy).toBeCalledWith(input)
        })
        it('should throw ValidationError if validation return errors', () => {
            const input = originalPostPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([
                'error',
            ])

            expect(() => Post.create(input)).toThrow(ValidationError)
        })

        it('should return a instance of Post if input is valid', () => {
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(originalPostPropsFixture())
            expect(post instanceof Post).toBe(true)
        })
    })
    describe('get id()', () => {
        it('should return the id from props', () => {
            const input = originalPostPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.id).toEqual(input.id)
        })
    })
    describe('get relatedPostId()', () => {
        it('should return the relatedPostId from props', () => {
            const input = originalPostPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.relatedPostId).toEqual(input.relatedPostId)
        })
    })
    describe('get authorId()', () => {
        it('should return the authorId from props', () => {
            const input = originalPostPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.authorId).toEqual(input.authorId)
        })
    })
    describe('get type()', () => {
        it('should return the type from props', () => {
            const input = originalPostPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.type).toEqual(input.type)
        })
    })
    describe('get content()', () => {
        it('should return the content from props', () => {
            const input = originalPostPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.content).toEqual(input.content)
        })
    })
    describe('get createdAt()', () => {
        it('should return the createdAt from props', () => {
            const input = originalPostPropsFixture()
            jest.spyOn(PostValidator.prototype, 'validate').mockReturnValue([])
            const post = Post.create(input)

            expect(post.createdAt).toEqual(input.createdAt)
        })
    })
})
