import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || "3000",
    sql: {
        database: process.env.MSSQL_DB || "master",
        user: process.env.MSSQL_USER || "SA",
        password: process.env.SA_PASSWORD,
        host: process.env.MSSQL_HOST || "mssql",
    },
    mongo: {
        uri: process.env.MONGO_URI || "mongodb://mongodb:27017/boxit_log",
        logDb: process.env.MONGO_DB || "boxit_log",
    },
    tables: {
        users: 'Users',
        products: 'Products',
        orders: 'Orders',
        orderDetails: 'OrderDetails',
    },
    procedure: {
        reports: "stores.GetSalesReports"
    },
    jwt: {
        secret: "MY_SECRET"
    }
};
