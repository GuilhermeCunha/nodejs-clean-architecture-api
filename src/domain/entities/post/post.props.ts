import { POST_TYPES } from '../../constants'

export type PostType = typeof POST_TYPES[number]

export type PostProps = {
    id: string
    author: string
    type: PostType
    content: string
    relatedPost?: string
    createdAt: Date
}
