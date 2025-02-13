import {config} from "../../config/dotenv";
import {Sequelize} from "sequelize-typescript";
import {UserEntity} from "./entities/User-entity";
import {ProductEntity} from "./entities/Product-entity";
import {OrderEntity} from "./entities/Order-entity";
import {OrderDetailEntity} from "./entities/OrderDetail-entity";

export class Database {
    private static instance: Sequelize;

    private constructor() {
    }

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize({
                dialect: 'mssql',
                logging: false,
                port: 1433,
                database: config.sql.database,
                username: config.sql.user,
                password: config.sql.password,
                host: config.sql.host,
                schema: 'stores',
                models: [UserEntity, ProductEntity, OrderEntity, OrderDetailEntity],
            });
        }
        return Database.instance;
    }

    public static connect() {
        Database.getInstance().authenticate().then(() => console.log('Connect SQL Server')
        ).catch((e) => console.error('Error Connect SQL Server:', e));
    }
}
