import { POST_TYPES } from '../../constants'

export type PostType = typeof POST_TYPES[number]

export type PostWithRelatedPostProps<Type = PostProps> = Type & {
    relatedPost: PostProps | null
}
export type OriginalPostProps = {
    type: 'original'
    id: string
    authorId: string
    content: string
    relatedPostId?: undefined
    createdAt: Date
}

export type RepostPostProps = {
    type: 'repost'
    id: string
    authorId: string
    content: undefined
    relatedPostId: string
    createdAt: Date
}

export type QuotePostProps = {
    type: 'quote'
    id: string
    authorId: string
    content: string
    relatedPostId: string
    createdAt: Date
}

export type PostProps = OriginalPostProps | RepostPostProps | QuotePostProps
