import Joi from "joi";

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
            throw new Error(error.details.map((err) => err.message).join(', '));
        }
        return value;
    }
}