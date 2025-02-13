import {Order} from "../../domain/models/order";
import {OrderFilter} from "../../domain/models/OrderFilter";
import {IOrderRepository} from "../../domain/repository/IOrderRepository";

export class OrderRepositoryImpl implements IOrderRepository {
    getOrders(filter: OrderFilter): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

    updateStock(id: number, stock: number): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    createOrder(order: Order): Promise<Order> {
        throw new Error("Method not implemented.");
    }

}