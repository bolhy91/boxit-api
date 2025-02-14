import {OrderControllerFactory} from "../../../application/factories/OrderControllerFactory";
import {AppRoute} from "./AppRoute";
import {Server as SocketIOServer} from "socket.io";

export class OrderRoutes extends AppRoute {
    private readonly io: SocketIOServer;

    constructor(io: SocketIOServer) {
        super();
        this.io = io;
        this.init();
    }

    private init() {
        const orderFactory = OrderControllerFactory.make()
        this.route.get('/', async (req, res, next) => {
            try {
                await orderFactory.findAll(req, res);
            } catch (error) {
                next(error);
            }
        });
        this.route.post('/', async (req, res, next) => {
            try {
                await orderFactory.create(req, res, this.io);
            } catch (error) {
                next(error);
            }
        });
    }
}