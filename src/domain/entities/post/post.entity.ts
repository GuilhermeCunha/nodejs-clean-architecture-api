import { ValidationError } from '../../errors/validation.error'
import { PostProps, PostType } from './post.props'
import { PostValidator } from './post.validator'

export class Post {
    props: PostProps

    private constructor(props: PostProps) {
        this.props = props
    }
    static create(props: PostProps): Post {
        const errors = new PostValidator().validate(props)

        if (errors.length > 0) throw new ValidationError(errors)

        return new Post(props)
    }

    get id(): string {
        return this.props.id
    }
    get authorId(): string {
        return this.props.authorId
    }
    get type(): PostType {
        return this.props.type
    }
    get content(): string | undefined {
        return this.props.content
    }
    get createdAt(): Date {
        return this.props.createdAt
    }
    get relatedPost(): string | undefined {
        return this.props.relatedPost
    }
}
