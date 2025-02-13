import {DataTypes} from "sequelize";
import {OrderEntity} from "./Order-entity";
import {ProductEntity} from "./Product-entity";
import {Column, Model, Table} from "sequelize-typescript";
import {config} from "../../../config/dotenv";

@Table({
    tableName: config.tables.orderDetails,
    modelName: 'OrderDetails',
    timestamps: false,
})
export class OrderDetailEntity extends Model {
    @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
    id!: number;
    @Column({
        field: 'order_id',
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: OrderEntity, key: 'id'
        }
    })
    orderId!: number;
    @Column({
        field: 'product_id',
        type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: ProductEntity, key: 'id'
        }
    })
    productId!: number;
    @Column({type: DataTypes.INTEGER, allowNull: false})
    quantity!: number;
    @Column({field: 'price_unit', type: DataTypes.DOUBLE, allowNull: false})
    price!: number;
}
