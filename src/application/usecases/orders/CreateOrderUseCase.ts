import {IOrderRepository} from "../../../domain/repository/IOrderRepository";
import {Order} from "../../../domain/models/order";

export class CreateOrderUseCase {
    constructor(private orderRepository: IOrderRepository) {
    }

    async execute(order: Order) {
        return await this.orderRepository.createOrder(order);
    }
}