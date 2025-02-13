import {GetListOrderUseCase} from "../../../application/usecases/orders/GetListOrderUseCase";
import {Request, Response} from "express";
import {OrderFilter} from "../../../domain/models/OrderFilter";

export class OrderController {
    constructor(
        private getListOrderUseCase: GetListOrderUseCase,
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
}