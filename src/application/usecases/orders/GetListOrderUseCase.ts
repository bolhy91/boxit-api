import {IOrderRepository} from "../../../domain/repository/IOrderRepository";
import {OrderFilter} from "../../../domain/models/OrderFilter";

export class GetListOrderUseCase {
    constructor(private orderRepository: IOrderRepository) {
    }

    async execute(filter: OrderFilter) {
        return await this.orderRepository.getOrders(filter);
    }
}