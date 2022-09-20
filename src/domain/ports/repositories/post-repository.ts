import {
    PostProps,
    PostWithRelatedPostProps,
} from '../../entities/post/post.props'
import { SortValue } from './shared'

export type GetPosts = {
    filters?: PostFilters
    sorts?: PostSorts
    expands?: PostExpands
    pagination: GetPostsPagination
}

export type PostSorts = {
    createdAt?: SortValue
}

export type PostFilters = {
    authorId?: string
    createdAfter?: Date
    createdBefore?: Date
}

export type PostExpands = {
    relatedPost?: boolean
}

export type GetPostsPagination = {
    skip: number
    limit: number
}

export type GetPostsResponsePagination = {
    total: number
    skip: number
    limit: number
}

export type GetPostsResponse = {
    results: (PostProps | PostWithRelatedPostProps)[]
    pagination: GetPostsResponsePagination
}

export interface IPostRepository {
    createPost(post: PostProps): Promise<PostProps>
    countPostsByUserInADay(userId: string, day: Date): Promise<number>
    getPostById(postId: string): Promise<PostProps | null>
    getPosts(param: GetPosts): Promise<GetPostsResponse>
    countPosts(filters?: PostFilters): Promise<number>
}
