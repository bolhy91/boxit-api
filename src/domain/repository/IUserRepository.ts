import {User} from "../models/user";
import {Auth} from "../models/Auth";

export interface IUserRepository {
    getUsers(): Promise<User[]>;

    createUser(user: User): Promise<User>;

    authenticate(email: string, password: string): Promise<Auth>
}