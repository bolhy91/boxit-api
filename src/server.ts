import express, {Application, Request, Response} from "express";
import {Database} from "./infrastructure/database/sql/SqlSeverDatabase";
import cors from "cors";
import {config} from "./infrastructure/config/dotenv";
import {MongoDatabase} from "./infrastructure/database/mongodb/MongoDatabase";
import {errorHandler} from "./shared/middlewares/ApiError";
import {ProductRoutes} from "./infrastructure/adapters/routes/productRoutes";

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        Database.connect();
        MongoDatabase.connect();
        this.middleware();
        this.routes();
        this.app.use(errorHandler);
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).json("Hello from the server!!!");
        });
        const productRoutes = new ProductRoutes();
        this.app.use("/products", productRoutes.getRouter());
    }

    listen() {
        this.app.listen(config.port, () => {
            console.log("Server running on port", config.port)
        })
    }
}

export default Server;