import { UserProps } from '../../user.props'

export const userPropsFixture = (
    override: Partial<UserProps> = {}
): UserProps => ({
    username: 'example',
    createdAt: new Date(),
    ...override,
})
