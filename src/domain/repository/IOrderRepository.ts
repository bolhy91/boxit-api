import {Order} from "../models/order";
import {OrderFilter} from "../models/OrderFilter";
import {OrderDetailEntity} from "../../infrastructure/database/sql/entities/OrderDetail-entity";
import {Transaction} from "sequelize";

export interface IOrderRepository {
    getOrders(filter: OrderFilter): Promise<Order[]>

    createOrder(order: Order): Promise<Order>

    validateStock(items: OrderDetailEntity[], transaction: Transaction): Promise<void>
}