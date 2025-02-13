import {ProductControllerFactory} from "../../../application/factories/ProductControllerFactory";
import {AppRoute} from "./AppRoute";

export class ProductRoutes extends AppRoute {
    constructor() {
        super();
        this.init();
    }

    private init() {
        const productFactory = ProductControllerFactory.make()
        this.route.get('/', async (req, res, next) => {
            try {
                await productFactory.findAll(req, res);
            } catch (error) {
                next(error);
            }
        });

        this.route.get('/:id', async (req, res, next) => {
            try {
                await productFactory.findById(req, res);
            } catch (error) {
                next(error);
            }
        });

        this.route.post('/', async (req, res, next) => {
            try {
                await productFactory.create(req, res);
            } catch (error) {
                next(error);
            }
        });

        this.route.patch('/:id', async (req, res, next) => {
            try {
                await productFactory.update(req, res);
            } catch (error) {
                next(error);
            }
        });

        this.route.delete('/:id', async (req, res, next) => {
            try {
                await productFactory.removeById(req, res);
            } catch (error) {
                next(error);
            }
        });
    }
}