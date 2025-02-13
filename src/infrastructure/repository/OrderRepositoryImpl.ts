import {Order} from "../../domain/models/order";
import {OrderFilter} from "../../domain/models/OrderFilter";
import {IOrderRepository} from "../../domain/repository/IOrderRepository";
import {Op} from "sequelize";
import {OrderEntity} from "../database/sql/entities/Order-entity";
import {UserEntity} from "../database/sql/entities/User-entity";
import {OrderDetailEntity} from "../database/sql/entities/OrderDetail-entity";
import {OrderMapper} from "../mappers/OrderMapper";
import {ProductEntity} from "../database/sql/entities/Product-entity";

export class OrderRepositoryImpl implements IOrderRepository {
    private readonly orderMapper: OrderMapper;

    constructor() {
        this.orderMapper = new OrderMapper();
    }

    async getOrders(filter: OrderFilter): Promise<Order[]> {
        try {
            const condition = filter?.user != undefined ? {name: {[Op.like]: `%${filter.user}%`}} : {};
            const orders = await OrderEntity.findAll({
                include: [
                    {
                        model: UserEntity,
                        where: condition,
                    },
                    {
                        model: OrderDetailEntity,
                        include: [
                            {
                                model: ProductEntity,
                            }
                        ]
                    },
                ]
            });
            return orders.map(order => this.orderMapper.entityToDomain(order));
        } catch (e) {
            throw e;
        }
    }

    updateStock(id: number, stock: number): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    createOrder(order: Order): Promise<Order> {
        throw new Error("Method not implemented.");
    }

}