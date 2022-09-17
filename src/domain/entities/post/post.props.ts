import { POST_TYPES } from '../../constants'

export type PostType = typeof POST_TYPES[number]

export type OriginalPostProps = {
    type: 'original'
    id: string
    author: string
    content: string
    relatedPost?: undefined
    createdAt: Date
}

export type RepostPostProps = {
    type: 'repost'
    id: string
    author: string
    content: undefined
    relatedPost?: string
    createdAt: Date
}

export type QuotePostProps = {
    type: 'quote'
    id: string
    author: string
    content: string
    relatedPost: string
    createdAt: Date
}

export type PostProps = OriginalPostProps | RepostPostProps | QuotePostProps
