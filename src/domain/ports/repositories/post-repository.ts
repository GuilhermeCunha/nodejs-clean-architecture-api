import { PostProps } from '../../entities/post/post.props'

export type GetPosts = {
    filters?: PostFilters
    pagination: GetPostsPagination
}

export type PostFilters = {
    authorId?: string
    createdAfter?: Date
    createdBefore?: Date
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
    posts: PostProps[]
    pagination: GetPostsResponsePagination
}

export interface IPostRepository {
    createPost(post: PostProps): Promise<PostProps>
    countPostsByUserInADay(userId: string, day: Date): Promise<number>
    getPostById(postId: string): Promise<PostProps | null>
    getPosts(param: GetPosts): Promise<GetPostsResponse>
    countPosts(filters?: PostFilters): Promise<number>
}
