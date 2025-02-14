import {RegisterUseCase} from "../../../application/usecases/users/RegisterUseCase";
import {LoginUseCase} from "../../../application/usecases/users/LoginUseCase";
import {Request, Response} from "express";
import {UserDTO} from "../dtos/UserDTO";
import {RequestNotValidException} from "../../../domain/exceptions/RequestNotValidException";
import {Logger} from "../../database/mongodb/models/LogEntity";
import {ItemNotFoundException} from "../../../domain/exceptions/ItemNotFoundException";
import {NotAuthorizeException} from "../../../domain/exceptions/NotAuthorizeException";

export class UserController {
    constructor(
        private registerUseCase: RegisterUseCase,
        private loginUseCase: LoginUseCase,
    ) {
    }

    async register(req: Request, res: Response) {
        try {
            const validator = UserDTO.validate(req.body);
            const result = await this.registerUseCase.execute(validator);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof RequestNotValidException) {
                await Logger.create({action: "ERROR_CREATE_USER_VALIDATION", data: error.message});
                return res.status(400).json({message: error.message});
            } else if (error instanceof ItemNotFoundException){
                return res.status(400).json({message: error.message});
            }
            await Logger.create({action: "ERROR_CREATE_PRODUCT", data: error});
            return res.status(500).json(error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            if (!email && !password) throw new RequestNotValidException("Field Required");
            const result = await this.loginUseCase.execute(email, password);
            res.status(200).json(result);
        } catch (e) {
            if (e instanceof ItemNotFoundException) {
                return res.status(400).json({message: e.message});
            } else if (e instanceof NotAuthorizeException) {
                return res.status(400).json({message: e.message});
            } else if (e instanceof RequestNotValidException) {
                return res.status(404).json({message: e.message});
            }
            return res.status(500).end();
        }
    }
}