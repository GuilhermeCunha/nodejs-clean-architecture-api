import { UserProps } from "../../entities/user/user.props";

export interface IUserRepository {
    getUserById(userId: string): Promise<UserProps | null>
}
