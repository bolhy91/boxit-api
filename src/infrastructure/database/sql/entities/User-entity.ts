import {sequelize} from "../SqlSeverDatabase";
import {DataTypes} from "sequelize";
import {config} from "../../../config/dotenv";

export const UserEntity = sequelize.define(
    config.tables.users, {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false},
    }
);
