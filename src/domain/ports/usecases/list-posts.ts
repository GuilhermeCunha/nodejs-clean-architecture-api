import { GetPosts, GetPostsResponse } from '../repositories/post-repository'

export type ListPostsInput = GetPosts

export type ListPostsOutput = GetPostsResponse

export interface IListPostsUseCase {
    execute(input: ListPostsInput): Promise<ListPostsOutput>
}
