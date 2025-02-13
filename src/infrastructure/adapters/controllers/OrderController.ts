import {GetListOrderUseCase} from "../../../application/usecases/orders/GetListOrderUseCase";
import {Request, Response} from "express";
import {OrderFilter} from "../../../domain/models/OrderFilter";
import {CreateOrderUseCase} from "../../../application/usecases/orders/CreateOrderUseCase";
import {RequestNotValidException} from "../../../domain/exceptions/RequestNotValidException";
import {ValidateStockException} from "../../../domain/exceptions/ValidateStockException";
import {CreateOrderDTO} from "../dtos/CreateOrderDTO";

export class OrderController {
    constructor(
        private getListOrderUseCase: GetListOrderUseCase,
        private createOrderUseCase: CreateOrderUseCase,
    ) {
    }

    async findAll(req: Request, res: Response) {
        try {
            const filter = new OrderFilter(req.query.user?.toString() || undefined);
            const orders = await this.getListOrderUseCase.execute(filter);
            return res.status(200).json(orders);
        } catch (e) {
            return res.status(500).end();
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validator = CreateOrderDTO.validate(req.body);
            const order = await this.createOrderUseCase.execute(validator);
            return res.status(201).json(order);
        } catch (e) {
            if (e instanceof RequestNotValidException) {
                return res.status(400).json({message: e.message});
            } else if (e instanceof ValidateStockException) {
                return res.status(400).json({message: e.message});
            }
            return res.status(500).json(e);
        }
    }
}