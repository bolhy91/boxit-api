import Joi from "joi";

export class CreateOrderDTO {
    static schema = Joi.object({
        name: Joi.string().required(),
        userId: Joi.number().required(),
        date: Joi.date().required(),
        total: Joi.number().required(),
        items: Joi.array().items(
            Joi.object({
                id: Joi.number().integer().positive().required(),
                productId: Joi.number().integer().positive().required(),
                quantity: Joi.number().integer().min(1).required(),
                priceUnit: Joi.number().precision(2).positive().required(),
            })
        ).min(1).required()
    })

    static validate(data: any) {
        const {error, value} = this.schema.validate(data, {abortEarly: false});
        if (error) {
            throw new Error(error.details.map((err) => err.message).join(', '));
        }
        return value;
    }
}