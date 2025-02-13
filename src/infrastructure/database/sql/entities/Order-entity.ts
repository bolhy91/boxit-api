import {DataTypes} from "sequelize";
import {UserEntity} from "./User-entity";
import {Column, Model, Table} from "sequelize-typescript";
import {config} from "../../../config/dotenv";

@Table({
    tableName: config.tables.orders,
    modelName: 'Order',
    timestamps: false,
})
export class OrderEntity extends Model {
    @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
    id!: number;
    @Column({
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: UserEntity, key: 'id'
        }
    })
    userId!: number;
    @Column({type: DataTypes.DATE, allowNull: false})
    date!: Date;
    @Column({type: DataTypes.DOUBLE, allowNull: false})
    total!: number;
}
