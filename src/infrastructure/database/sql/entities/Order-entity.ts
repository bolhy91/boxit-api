import {DataTypes} from "sequelize";
import {UserEntity} from "./User-entity";
import {BelongsTo, Column, HasMany, Model, Table} from "sequelize-typescript";
import {config} from "../../../config/dotenv";
import {OrderDetailEntity} from "./OrderDetail-entity";
import {OrderDetail} from "../../../../domain/models/orderDetail";

@Table({
    tableName: config.tables.orders,
    modelName: 'Orders',
    timestamps: false,
})
export class OrderEntity extends Model {
    @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
    id!: number;
    @Column({
        field: 'user_id',
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: UserEntity, key: 'id'
        }
    })
    userId!: number;
    @Column({type: DataTypes.STRING, allowNull: false})
    date!: string;
    @Column({type: DataTypes.DOUBLE, allowNull: false})
    total!: number;

    items!: OrderDetailEntity[]

    @HasMany(() => OrderDetailEntity, {foreignKey: 'orderId'})
    orderDetails!: OrderDetailEntity[];

    @BelongsTo(() => UserEntity, {foreignKey: 'userId'})
    user!: UserEntity;
}
