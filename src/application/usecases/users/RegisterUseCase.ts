import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {RequestNotValidException} from "../../../domain/exceptions/RequestNotValidException";
import {User} from "../../../domain/models/user";

export class RegisterUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(user: User) {
        console.log(user)
        const verifyUser = await this.userRepository.findByEmail(user.email);
        if (verifyUser) throw new RequestNotValidException("User Exist");
        return await this.userRepository.save(user);
    }
}