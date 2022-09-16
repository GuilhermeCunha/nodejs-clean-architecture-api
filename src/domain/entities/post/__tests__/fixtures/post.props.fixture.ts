import { userPropsFixture } from '../../../user/__tests__/fixtures/user.props.fixture'
import { PostProps } from '../../post.props'

export const postPropsFixture = (
    override: Partial<PostProps> = {}
): PostProps => ({
    author: userPropsFixture().username,
    content: 'post content',
    type: 'original',
    createdAt: new Date(),
    relatedPost: 'ba14200a-5c0d-438f-ac92-671f39b3ce1e',
    id: 'a9fdab53-a149-43d9-b796-a71eaa5d0571',
    ...override,
})
