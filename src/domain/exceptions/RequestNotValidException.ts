import {ApiError} from "../../shared/middlewares/ApiError";

export class RequestNotValidException extends ApiError {
    constructor(message: string) {
        super(message, 400);
    }
}