import {sequelize} from "../SqlSeverDatabase";
import {DataTypes} from "sequelize";
import {config} from "../../../config/dotenv";
import {UserEntity} from "./User-entity";

export const OrderEntity = sequelize.define(
    config.tables.orders, {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        user_id: {
            type: DataTypes.INTEGER, allowNull: false, references: {
                model: UserEntity, key: 'id'
            }
        },
        date: {type: DataTypes.DATE, allowNull: false},
        total: {type: DataTypes.DOUBLE, allowNull: false},
    }
);
