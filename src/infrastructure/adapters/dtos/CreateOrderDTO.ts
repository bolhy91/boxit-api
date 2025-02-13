import Joi from "joi";
import {RequestNotValidException} from "../../../domain/exceptions/RequestNotValidException";

export class CreateOrderDTO {
    static schema = Joi.object({
        userId: Joi.number().required(),
        date: Joi.date().required(),
        total: Joi.number().required(),
        items: Joi.array().items(
            Joi.object({
                productId: Joi.number().integer().positive().required(),
                quantity: Joi.number().integer().min(1).required(),
                priceUnit: Joi.number().precision(2).positive().required(),
            })
        ).min(1).required()
    })

    static validate(data: any) {
        const {error, value} = this.schema.validate(data, {abortEarly: false});
        if (error) {
            const errors = error.details.map((err) => err.message).join(', ')
            throw new RequestNotValidException(errors);
        }
        return value;
    }
}