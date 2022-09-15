import { userPropsFixture } from '../../../user/__tests__/fixtures/user.props.fixture'
import { PostProps } from '../../post.props'

export const postPropsFixture = (
    override: Partial<PostProps> = {}
): PostProps => ({
    author: userPropsFixture().username,
    content: 'post content',
    type: 'original',
    createdAt: new Date(),
    ...override,
})
