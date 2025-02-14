import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {ItemNotFoundException} from "../../../domain/exceptions/ItemNotFoundException";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {NotAuthorizeException} from "../../../domain/exceptions/NotAuthorizeException";
import {config} from "../../../infrastructure/config/dotenv";

export class LoginUseCase {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ItemNotFoundException();
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new NotAuthorizeException();
        const token = jwt.sign({id: user.id, email: user.email}, config.jwt.secret, {expiresIn: "1h"});
        return {success: true, accessToken: token};
    }
}