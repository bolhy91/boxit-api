import {sequelize} from "../SqlSeverDatabase";
import {DataTypes} from "sequelize";
import {config} from "../../../config/dotenv";

export const ProductEntity = sequelize.define(
    config.tables.products, {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        price: {type: DataTypes.DOUBLE, allowNull: false},
        stock: {type: DataTypes.INTEGER, allowNull: false},
        category: {type: DataTypes.STRING, allowNull: false},
    }
);
