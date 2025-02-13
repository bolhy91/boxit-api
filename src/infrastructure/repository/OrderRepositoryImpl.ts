import {Order} from "../../domain/models/order";
import {OrderFilter} from "../../domain/models/OrderFilter";
import {IOrderRepository} from "../../domain/repository/IOrderRepository";
import sequelize, {Op, Transaction} from "sequelize";
import {OrderEntity} from "../database/sql/entities/Order-entity";
import {UserEntity} from "../database/sql/entities/User-entity";
import {OrderDetailEntity} from "../database/sql/entities/OrderDetail-entity";
import {OrderMapper} from "../mappers/OrderMapper";
import {ProductEntity} from "../database/sql/entities/Product-entity";
import {Sequelize} from "sequelize-typescript";
import {ItemNotFoundException} from "../../domain/exceptions/ItemNotFoundException";
import {ValidateStockException} from "../../domain/exceptions/ValidateStockException";
import {Database} from "../database/sql/SqlSeverDatabase";

export class OrderRepositoryImpl implements IOrderRepository {
    private readonly orderMapper: OrderMapper;
    private readonly sequelize: Sequelize;

    constructor() {
        this.orderMapper = new OrderMapper();
        this.sequelize = Database.getInstance()
    }

    async getOrders(filter: OrderFilter): Promise<Order[]> {
        try {
            const condition = filter?.user != undefined ? {name: {[Op.like]: `%${filter.user.toLowerCase()}%`}} : {};
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

    async createOrder(order: Order): Promise<Order> {
        let transaction!: Transaction;
        try {
            transaction = await this.sequelize.transaction()
            const mapper = this.orderMapper.dtoToDomainOrEntity(order) as OrderEntity;
            await this.validateStock(mapper.items, transaction);
            const entity = await mapper.save({transaction: transaction});
            const items = mapper.items.map(item => ({
                orderId: entity.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));
            await OrderDetailEntity.bulkCreate(items, {transaction});
            await transaction.commit();
            const newOrder = await entity.reload({
                include: [
                    {
                        model: UserEntity,
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
            return this.orderMapper.entityToDomain(newOrder);
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async validateStock(items: OrderDetailEntity[], transaction: sequelize.Transaction): Promise<void> {
        for (const item of items) {
            const product = await ProductEntity.findByPk(item.productId, {transaction});
            if (!product) throw new ItemNotFoundException();
            if (product.stock < item.quantity) {
                throw new ValidateStockException(product.name, product.stock, item.quantity);
            }
            await product.update({stock: product.stock - item.quantity}, {transaction});
        }
    }
}