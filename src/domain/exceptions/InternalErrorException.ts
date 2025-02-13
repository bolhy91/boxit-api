import {ApiError} from "../../shared/middlewares/ApiError";

export class InternalErrorException extends ApiError {
    constructor() {
        super("Internal Server", 500);
    }
}