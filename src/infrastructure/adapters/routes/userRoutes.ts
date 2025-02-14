import {AppRoute} from "./AppRoute";
import {UserControllerFactory} from "../../../application/factories/UserControllerFactory";

export class UserRoutes extends AppRoute {
    constructor() {
        super();
        this.init();
    }

    private init() {
        const userFactory = UserControllerFactory.make();
        this.route.patch('/register', async (req, res, next) => {
            try {
                await userFactory.register(req, res);
            } catch (error) {
                next(error);
            }
        });

        this.route.post('/login', async (req, res, next) => {
            try {
                await userFactory.login(req, res);
            } catch (error) {
                next(error);
            }
        });
    }
}