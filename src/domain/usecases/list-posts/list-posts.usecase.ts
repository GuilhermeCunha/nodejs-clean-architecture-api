import { IPostRepository } from '../../ports/repositories/post-repository'
import {
    IListPostsUseCase,
    ListPostsInput,
    ListPostsOutput,
} from '../../ports/usecases/list-posts'

export type ListPostsUseCaseProps = {
    postRepository: IPostRepository
}

export class ListPostsUseCase implements IListPostsUseCase {
    props: ListPostsUseCaseProps
    constructor(props: ListPostsUseCaseProps) {
        this.props = props
    }

    async execute(input: ListPostsInput): Promise<ListPostsOutput> {
        return await this.props.postRepository.getPosts(input)
    }
}
