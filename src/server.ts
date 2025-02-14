import express, {Application} from "express";
import {Database} from "./infrastructure/database/sql/SqlSeverDatabase";
import cors from "cors";
import {config} from "./infrastructure/config/dotenv";
import {MongoDatabase} from "./infrastructure/database/mongodb/MongoDatabase";
import {errorHandler} from "./shared/middlewares/ApiError";
import {ProductRoutes} from "./infrastructure/adapters/routes/productRoutes";
import {OrderRoutes} from "./infrastructure/adapters/routes/orderRoutes";
import {Server as SocketIOServer} from "socket.io";
import {createServer, Server as HTTPServer} from "http";
import {UserRoutes} from "./infrastructure/adapters/routes/userRoutes";

class Server {
    private readonly app: Application;
    private readonly httpServer: HTTPServer;
    private readonly io: SocketIOServer;

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: {origin: "*"}, transports: ['websocket'],
        });
        Database.connect();
        MongoDatabase.connect();
        this.middleware();
        this.routes();
        this.configureSockets();
        this.app.use(errorHandler);
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private configureSockets() {
        this.io.on("connection", (socket) => {
            console.log("WebSocket Connect");
            socket.on("disconnect", () => {
                console.log("WebSocket Disconnect");
            });
        });
    }

    private routes() {
        const productRoutes = new ProductRoutes();
        this.app.use("/products", productRoutes.getRouter());
        const orderRoutes = new OrderRoutes(this.io);
        this.app.use("/orders", orderRoutes.getRouter());
        const userRoutes = new UserRoutes();
        this.app.use("/users", userRoutes.getRouter());

    }

    listen() {
        this.httpServer.listen(config.port, () => {
            console.log("Server running on port", config.port)
        })
    }
}

export default Server;