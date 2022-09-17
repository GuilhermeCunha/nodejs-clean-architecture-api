import { Post } from '../../../../entities/post/post.entity'
import { quotePostPropsFixture } from '../../../../entities/post/__tests__/fixtures/post.props.fixture'
import { DailyPostLimitError } from '../../../../errors/daily-post-limit.error'
import { NotFoundError } from '../../../../errors/not-found.error'
import { NotAllowedError } from '../../../../errors/not-allowed.error'

import { CreateQuotePostUseCase } from '../../create-quote-post.usecase'

describe('CreateQuotePostUseCase', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterAll(() => {
        jest.clearAllMocks()
        jest.useRealTimers()
    })
    describe('validateDailyLimit', () => {
        it('should call countPostsByUserInADay with correct params', async () => {
            const useCase = new CreateQuotePostUseCase({
                postRepository: {
                    countPostsByUserInADay: jest.fn().mockResolvedValue(6),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()

            const today = new Date()
            jest.useFakeTimers().setSystemTime(today)

            const countPostsByUserInADaySpy = jest
                .spyOn(useCase.props.postRepository, 'countPostsByUserInADay')
                .mockImplementation(jest.fn())

            await useCase.validateDailyLimit(input.author)

            expect(countPostsByUserInADaySpy).toBeCalledWith(
                input.author,
                today
            )
        })
        it('should throw DailyPostLimitError if count is bigger than 5', () => {
            const useCase = new CreateQuotePostUseCase({
                postRepository: {
                    countPostsByUserInADay: jest.fn(),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()

            jest.spyOn(
                useCase.props.postRepository,
                'countPostsByUserInADay'
            ).mockResolvedValue(6)

            expect(() =>
                useCase.validateDailyLimit(input.author)
            ).rejects.toThrow(DailyPostLimitError)
        })
        it('should resolves if count is less than or equal 5', () => {
            const input = quotePostPropsFixture()

            for (let count = 0; count < 6; count += 1) {
                const useCase = new CreateQuotePostUseCase({
                    postRepository: {
                        countPostsByUserInADay: jest
                            .fn()
                            .mockResolvedValueOnce(count),
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)

                expect(() =>
                    useCase.validateDailyLimit(input.author)
                ).not.toThrow()
            }
        })
    })

    describe('execute', () => {
        it('should call identifierFactory.create', async () => {
            const mockedId = '12312'
            const useCase = new CreateQuotePostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                    getPostById: jest.fn().mockResolvedValue({
                        type: 'original',
                    }),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()

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
            const useCase = new CreateQuotePostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                    getPostById: jest.fn().mockResolvedValue({
                        type: 'original',
                    }),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()
            jest.useFakeTimers()
            const quotePostProps = {
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

            expect(spy).toBeCalledWith(quotePostProps)
        })
        it('should throw NotFoundError when post was not found', async () => {
            const mockedId = '12312'
            const useCase = new CreateQuotePostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                    getPostById: jest.fn().mockResolvedValue(null),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()
            jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(Post, 'create').mockReturnValue(input as any)
            jest.spyOn(useCase, 'validateDailyLimit').mockImplementation(
                jest.fn()
            )

            expect(() => useCase.execute(input)).rejects.toThrow(NotFoundError)
        })
        it('should throw NotAllowedError when related post is quote', async () => {
            const mockedId = '12312'
            const input = quotePostPropsFixture()
            const useCase = new CreateQuotePostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                    getPostById: jest.fn().mockResolvedValue({
                        type: 'quote',
                    }),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)

            jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(Post, 'create').mockReturnValue(input as any)
            jest.spyOn(useCase, 'validateDailyLimit').mockImplementation(
                jest.fn()
            )

            expect(() => useCase.execute(input)).rejects.toThrow(
                NotAllowedError
            )
        })
        it('should call validateDailyLimit', async () => {
            const mockedId = '12312'
            const useCase = new CreateQuotePostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                    getPostById: jest.fn().mockResolvedValue({
                        type: 'original',
                    }),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()
            jest.useFakeTimers()
            const quotePostProps = {
                ...input,
                id: mockedId,
                createdAt: new Date(),
            }

            jest.spyOn(useCase.props.identifierFactory, 'create')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(Post, 'create').mockReturnValue(input as any)
            const spy = jest
                .spyOn(useCase, 'validateDailyLimit')
                .mockImplementation(jest.fn())

            await useCase.execute(input)

            expect(spy).toBeCalledWith(quotePostProps.author)
        })
        it('should call postRepository.createPost', async () => {
            const mockedId = '12312'
            const useCase = new CreateQuotePostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                    getPostById: jest.fn().mockResolvedValue({
                        type: 'original',
                    }),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()
            jest.useFakeTimers()
            const quotePostProps = {
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

            expect(spy).toBeCalledWith(quotePostProps)
        })
        it('should return quotePostProps', async () => {
            const mockedId = '12312'
            const useCase = new CreateQuotePostUseCase({
                identifierFactory: {
                    create: jest.fn().mockReturnValue(mockedId),
                },
                postRepository: {
                    createPost: jest.fn(),
                    getPostById: jest.fn().mockResolvedValue({
                        type: 'original',
                    }),
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const input = quotePostPropsFixture()
            jest.useFakeTimers()
            const quotePostProps = {
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

            expect(response).toStrictEqual(quotePostProps)
        })
    })
})
