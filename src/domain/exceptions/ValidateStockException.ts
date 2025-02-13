import {ApiError} from "../../shared/middlewares/ApiError";

export class ValidateStockException extends ApiError {
    constructor(productName: string, productStock: number, quantity: number) {
        super(`Stock insuficiente para el producto ${productName}. Stock disponible: ${productStock}, solicitado: ${quantity}`, 400);
    }
}