import { userPropsFixture } from '../../../user/__tests__/fixtures/user.props.fixture'
import {
    OriginalPostProps,
    QuotePostProps,
    RepostPostProps,
} from '../../post.props'

export const originalPostPropsFixture = (
    override: Partial<OriginalPostProps> = {}
): OriginalPostProps => ({
    authorId: userPropsFixture().username,
    content: 'post content',
    type: 'original',
    createdAt: new Date(),
    relatedPostId: undefined,
    id: 'a9fdab53-a149-43d9-b796-a71eaa5d0571',
    ...override,
})

export const repostPostPropsFixture = (
    override: Partial<RepostPostProps> = {}
): RepostPostProps => ({
    authorId: userPropsFixture().username,
    content: undefined,
    type: 'repost',
    createdAt: new Date(),
    relatedPostId: 'bb9fdab53-a149-43d9-b796-a71eaa5d0571',
    id: 'a9fdab53-a149-43d9-b796-a71eaa5d0571',
    ...override,
})

export const quotePostPropsFixture = (
    override: Partial<QuotePostProps> = {}
): QuotePostProps => ({
    authorId: userPropsFixture().username,
    content: '12312313 asdasasds',
    type: 'quote',
    createdAt: new Date(),
    relatedPostId: 'bb9fdab53-a149-43d9-b796-a71eaa5d0571',
    id: 'a9fdab53-a149-43d9-b796-a71eaa5d0571',
    ...override,
})
