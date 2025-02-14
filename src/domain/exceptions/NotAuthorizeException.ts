import {ApiError} from "../../shared/middlewares/ApiError";

export class NotAuthorizeException extends ApiError {
    constructor() {
        super("Not Authorize", 403);
    }
}