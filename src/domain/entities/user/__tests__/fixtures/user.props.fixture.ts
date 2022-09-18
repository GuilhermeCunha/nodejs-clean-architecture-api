import { UserProps } from '../../user.props'

export const userPropsFixture = (
    override: Partial<UserProps> = {}
): UserProps => ({
    id: '123123123123',
    username: 'example',
    createdAt: new Date(),
    ...override,
})
