export type ListUserProfileInput = {
    userId: string
}

export type ListUserProfileOutput = {
    username: string
    createdAt: Date
    posts: number
}

export interface IListUserProfileUseCase {
    execute(input: ListUserProfileInput): Promise<ListUserProfileOutput>
}
