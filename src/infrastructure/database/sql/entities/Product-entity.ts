import {DataTypes} from "sequelize";
import {Column, Model, Table} from "sequelize-typescript";
import {config} from "../../../config/dotenv";


@Table({
    tableName: config.tables.products,
    modelName: 'Product',
    timestamps: false,
})
export class ProductEntity extends Model {
    @Column({type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true})
    id!: string;

    @Column({type: DataTypes.STRING, allowNull: false})
    name!: string;

    @Column({type: DataTypes.DOUBLE, allowNull: false})
    price!: string;

    @Column({type: DataTypes.INTEGER, allowNull: false})
    stock!: string;

    @Column({type: DataTypes.STRING, allowNull: false})
    category!: string;
}
