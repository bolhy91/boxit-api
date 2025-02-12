import mongoose from "mongoose";
import {config} from "../../config/dotenv";

export const connectMongo = async () => {
    try {
        await mongoose.connect(config.mongo.uri);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
    }
};
