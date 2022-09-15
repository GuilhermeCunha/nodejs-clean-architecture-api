import { POST_TYPES } from '../../constants'

export type PostType = typeof POST_TYPES[number]

export type PostProps = {
    author: string
    type: PostType
    content: string
    createdAt: Date
}
