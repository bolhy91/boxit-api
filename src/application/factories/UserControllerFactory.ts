import {UserRepositoryImpl} from "../../infrastructure/repository/UserRepositoryImpl";
import {RegisterUseCase} from "../usecases/users/RegisterUseCase";
import {LoginUseCase} from "../usecases/users/LoginUseCase";
import {UserController} from "../../infrastructure/adapters/controllers/UserController";

export class UserControllerFactory {
    static make() {
        const repository = new UserRepositoryImpl()
        const registerUseCase = new RegisterUseCase(repository);
        const loginUseCase = new LoginUseCase(repository);
        return new UserController(registerUseCase, loginUseCase);
    }
}