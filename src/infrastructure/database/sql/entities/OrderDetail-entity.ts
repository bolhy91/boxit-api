import {sequelize} from "../SqlSeverDatabase";
import {DataTypes} from "sequelize";
import {config} from "../../../config/dotenv";
import {UserEntity} from "./User-entity";
import {OrderEntity} from "./Order-entity";
import {ProductEntity} from "./Product-entity";

export const OrderDetailEntity = sequelize.define(
    config.tables.orderDetails, {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        order_id: {
            type: DataTypes.INTEGER, allowNull: false, references: {
                model: OrderEntity, key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER, allowNull: false,
            references: {
                model: ProductEntity, key: 'id'
            }
        },
        quantity: {type: DataTypes.INTEGER, allowNull: false},
        price_unit: {type: DataTypes.DOUBLE, allowNull: false},
    }
);
