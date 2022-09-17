import { PostProps } from '../../entities/post/post.props'

export interface IPostRepository {
    createPost(post: PostProps): Promise<PostProps>
    countPostsByUserInADay(userId: string, day: Date): Promise<number>
    getPostById(postId: string): Promise<PostProps | null>
}
