import Joi from "joi";
import {RequestNotValidException} from "../../../domain/exceptions/RequestNotValidException";

export class CreateProductDTO {
    static schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        category: Joi.string().required(),
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