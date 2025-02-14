import {GetListOrderUseCase} from "../../../application/usecases/orders/GetListOrderUseCase";
import {Request, Response} from "express";
import {OrderFilter} from "../../../domain/models/OrderFilter";
import {CreateOrderUseCase} from "../../../application/usecases/orders/CreateOrderUseCase";
import {RequestNotValidException} from "../../../domain/exceptions/RequestNotValidException";
import {ValidateStockException} from "../../../domain/exceptions/ValidateStockException";
import {CreateOrderDTO} from "../dtos/CreateOrderDTO";
import {Logger} from "../../database/mongodb/models/LogEntity";
import {GetReportUseCase} from "../../../application/usecases/reports/GetReportUseCase";

export class OrderController {
    constructor(
        private getListOrderUseCase: GetListOrderUseCase,
        private createOrderUseCase: CreateOrderUseCase,
        private getReportUseCase: GetReportUseCase,
    ) {
    }

    async findAll(req: Request, res: Response) {
        try {
            const filter = new OrderFilter(req.query.user?.toString() || undefined);
            const orders = await this.getListOrderUseCase.execute(filter);
            const v  = await this.getReportUseCase.execute()
            console.log(v)
            return res.status(200).json(v);
        } catch (e) {
            console.log(e)
            return res.status(500).end();
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validator = CreateOrderDTO.validate(req.body);
            const order = await this.createOrderUseCase.execute(validator);
            await Logger.create({action: 'CREATE_ORDER', data: order.toString()});
            return res.status(201).json(order);
        } catch (e) {
            if (e instanceof RequestNotValidException) {
                await Logger.create({action: "ERROR_CREATE_PRODUCT_VALIDATION", data: e.message});
                return res.status(400).json({message: e.message});
            } else if (e instanceof ValidateStockException) {
                await Logger.create({action: "ERROR_CREATE_ORDER_STOCK", data: e.message});
                return res.status(400).json({message: e.message});
            }
            await Logger.create({action: 'ERROR_CREATE_ORDER', data: e});
            return res.status(500).json(e);
        }
    }
}