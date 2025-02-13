import mongoose from "mongoose";
import {config} from "../../config/dotenv";

export class MongoDatabase {
    static async connect(): Promise<void> {
        try {
            await mongoose.connect(config.mongo.uri, {
                dbName: config.mongo.logDb,
            });
            console.log("Connect MongoDB");
        } catch (error) {
            console.error("Error Connect MongoDB", error);
        }
    }

    static async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log("Error Disconnect MongoDB");
        } catch (error) {
            console.error("Error Disconnect MongoDB", error);
        }
    }
}