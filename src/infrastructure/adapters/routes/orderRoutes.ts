import {OrderControllerFactory} from "../../../application/factories/OrderControllerFactory";
import {AppRoute} from "./AppRoute";

export class OrderRoutes extends AppRoute {
    constructor() {
        super();
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
    }
}