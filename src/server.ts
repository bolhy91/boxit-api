import express, {Application, Response, Request} from "express";
import {Database} from "./infrastructure/database/sql/SqlSeverDatabase";
import cors from "cors";
import {config} from "./infrastructure/config/dotenv";
import {MongoDatabase} from "./infrastructure/database/mongodb/MongoDatabase";

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        Database.connect();
        MongoDatabase.connect();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).json("Hello from the server!!!");
        });
    }

    listen() {
        this.app.listen(config.port, () => {
            console.log("Server running on port", config.port)
        })
    }
}

export default Server;