import {ApiError} from "../../shared/middlewares/ApiError";

export class ItemNotFoundException extends ApiError {
    constructor() {
        super("Item Not Found", 404);
    }
}