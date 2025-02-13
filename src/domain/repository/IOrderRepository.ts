import {Order} from "../models/order";
import {OrderFilter} from "../models/OrderFilter";

export interface IOrderRepository {
    getOrders(filter: OrderFilter): Promise<Order[]>

    updateStock(id: number, stock: number): Promise<Order>

    createOrder(order: Order): Promise<Order>
}