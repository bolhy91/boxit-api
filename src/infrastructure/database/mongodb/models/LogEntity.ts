import mongoose from "mongoose";
import {config} from "../../../config/dotenv";

const logSchema = new mongoose.Schema({
    action: String,
    data: Object,
    timestamp: {type: Date, default: Date.now()},
});

export const Logger = mongoose.model(config.mongo.logDb, logSchema);
