import {Sequelize} from "sequelize";
import {config} from "../../config/dotenv";

export const sequelize = new Sequelize(
    config.sql.database,
    config.sql.user,
    config.sql.password,
    {
        host: config.sql.host,
        dialect: 'mysql',
        logging: false,
    }
);

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected database");
    } catch (error) {
        console.log(error);
    }
};
