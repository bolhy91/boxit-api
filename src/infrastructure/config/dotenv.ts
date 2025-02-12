import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || "4000",
    sql: {
        database: process.env.DB_NAME || "default_db",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        host: process.env.DB_HOST || "localhost",
    },
    mongo: {
        uri: process.env.MONGO_URI || "mongodb://localhost:27017/default_db",
    },
};
