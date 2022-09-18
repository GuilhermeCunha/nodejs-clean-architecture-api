import { Post } from '../../../../entities/post/post.entity'
import { originalPostPropsFixture } from '../../../../entities/post/__tests__/fixtures/post.props.fixture'
import { DailyPostLimitError } from '../../../../errors/daily-post-limit.error'
import { CreateOriginalPostUseCase } from '../../create-original-post.usecase'

describe('CreateOriginalPostUseCase', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterAll(() => {
        jest.clearAllMocks()
        jest.useRealTimers()
    })
    describe('validateDailyLimit', () => {
        it('should call countPostsByUserInADay with correct params', async () => {
            const useCase = new CreateOriginalPostUseCase({
                postRepository: {
                    countPostsByUserInADay: jest.fn().mockResolvedValue(6),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = originalPostPropsFixture()

            const today = new Date()
            jest.useFakeTimers().setSystemTime(today)

            const countPostsByUserInADaySpy = jest
                .spyOn(useCase.props.postRepository, 'countPostsByUserInADay')
                .mockImplementation(jest.fn())

            await useCase.validateDailyLimit(input.authorId)

            expect(countPostsByUserInADaySpy).toBeCalledWith(
                input.authorId,
                today
            )
        })
        it('should throw DailyPostLimitError if count is bigger than 5', () => {
            const useCase = new CreateOriginalPostUseCase({
                postRepository: {
                    countPostsByUserInADay: jest.fn(),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = originalPostPropsFixture()

            jest.spyOn(
                useCase.props.postRepository,
                'countPostsByUserInADay'
            ).mockResolvedValue(6)

            expect(() =>
                useCase.validateDailyLimit(input.authorId)
            ).rejects.toThrow(DailyPostLimitError)
        })
        it('should resolves if count is less than or equal 5', () => {
            const input = originalPostPropsFixture()

            for (let count = 0; count < 6; count += 1) {
                const useCase = new CreateOriginalPostUseCase({
                    postRepository: {
                        countPostsByUserInADay: jest
                            .fn()
                            .mockResolvedValueOnce(count),
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)

                expect(() =>
                    useCase.validateDailyLimit(input.authorId)
                ).not.toThrow()
            }
        })
    })

    describe('execute', () => {
        it('should call identifierFactory.create', async () => {
            const mockedId = '12312'
            const useCase = new CreateOriginalPostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = originalPostPropsFixture()

            const spy = jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(Post, 'create').mockReturnValue(input as any)
            jest.spyOn(useCase, 'validateDailyLimit').mockImplementation(
                jest.fn()
            )

            await useCase.execute(input)

            expect(spy).toBeCalled()
        })
        it('should call Post.create', async () => {
            const mockedId = '12312'
            const useCase = new CreateOriginalPostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = originalPostPropsFixture()
            jest.useFakeTimers()
            const originalPostProps = {
                ...input,
                id: mockedId,
                createdAt: new Date(),
            }

            jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const spy = jest.spyOn(Post, 'create').mockReturnValue(input as any)
            jest.spyOn(useCase, 'validateDailyLimit').mockImplementation(
                jest.fn()
            )

            await useCase.execute(input)

            expect(spy).toBeCalledWith(originalPostProps)
        })
        it('should call validateDailyLimit', async () => {
            const mockedId = '12312'
            const useCase = new CreateOriginalPostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = originalPostPropsFixture()
            const originalPostProps = {
                ...input,
                id: mockedId,
            }

            jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(Post, 'create').mockReturnValue(input as any)
            const spy = jest
                .spyOn(useCase, 'validateDailyLimit')
                .mockImplementation(jest.fn())

            await useCase.execute(input)

            expect(spy).toBeCalledWith(originalPostProps.authorId)
        })
        it('should call postRepository.createPost', async () => {
            const mockedId = '12312'
            const useCase = new CreateOriginalPostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = originalPostPropsFixture()
            jest.useFakeTimers()
            const originalPostProps = {
                ...input,
                id: mockedId,
                createdAt: new Date(),
            }

            jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(Post, 'create').mockReturnValue(input as any)
            jest.spyOn(useCase, 'validateDailyLimit').mockImplementation(
                jest.fn()
            )
            const spy = jest
                .spyOn(useCase.props.postRepository, 'createPost')
                .mockImplementation(jest.fn())
            await useCase.execute(input)

            expect(spy).toBeCalledWith(originalPostProps)
        })
        it('should return originalPostProps', async () => {
            const mockedId = '12312'
            const useCase = new CreateOriginalPostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = originalPostPropsFixture()
            jest.useFakeTimers()
            const originalPostProps = {
                ...input,
                id: mockedId,
                createdAt: new Date(),
            }

            jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(Post, 'create').mockReturnValue(input as any)
            jest.spyOn(useCase, 'validateDailyLimit').mockImplementation(
                jest.fn()
            )
            jest.spyOn(
                useCase.props.postRepository,
                'createPost'
            ).mockImplementation(jest.fn())
            const response = await useCase.execute(input)

            expect(response).toStrictEqual(originalPostProps)
        })
    })
})
