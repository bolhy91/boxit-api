import {Auth} from "../../domain/models/Auth";
import {User} from "../../domain/models/user";
import {IUserRepository} from "../../domain/repository/IUserRepository";

export class UserRepositoryImpl implements IUserRepository {
    getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    createUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    authenticate(email: string, password: string): Promise<Auth> {
        throw new Error("Method not implemented.");
    }
}