import {IMapper} from "./IMapper";
import {Order} from "../../domain/models/order";
import {OrderEntity} from "../database/sql/entities/Order-entity";
import {OrderDetailEntity} from "../database/sql/entities/OrderDetail-entity";
import {OrderDetail} from "../../domain/models/orderDetail";
import {ProductEntity} from "../database/sql/entities/Product-entity";
import {Product} from "../../domain/models/product";

export class OrderMapper implements IMapper<Order, OrderEntity> {
    dtoToDomainOrEntity(model: any): Order | OrderEntity {
        const entity = new OrderEntity();
        entity.userId = model.userId;
        entity.date = model.date;
        entity.total = model.total;
        entity.items = this.mapOrderDetailEntity(entity.id, model.items)
        return entity;
    }


    DomainToEntity(model: Order): OrderEntity {
        const entity = new OrderEntity();
        entity.userId = model.user.id;
        entity.date = model.date;
        entity.total = model.total;
        entity.items = this.mapOrderDetailEntity(entity.id, model.items);
        return entity;
    }

    entityToDomain(model: OrderEntity): Order {
        return new Order(
            model.id,
            model.user,
            model.date,
            model.total,
            this.mapOrderDetail(model.id, model.items),
        )
    }

    mapOrderDetail(id: number, items: OrderDetailEntity[]): OrderDetail[] {
        return items.map((item) => ({
            id: item.id,
            orderId: id,
            product: this.mapProductEntityToProduct(item.product),
            quantity: item.quantity,
            priceUnit: item.price,
        }));
    }

    mapOrderDetailEntity(id: number, items: any): OrderDetailEntity[] {
        return items.map((item: { productId: number; quantity: number; price: number; }) => ({
            orderId: id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }));
    }

    mapProductEntityToProduct(product: ProductEntity) {
        return new Product(product.id, product.name, product.price, product.stock, product.category)
    }
}