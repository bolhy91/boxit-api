import {OrderRepositoryImpl} from "../../infrastructure/repository/OrderRepositoryImpl";
import {GetListOrderUseCase} from "../usecases/orders/GetListOrderUseCase";
import {OrderController} from "../../infrastructure/adapters/controllers/OrderController";
import {CreateOrderUseCase} from "../usecases/orders/CreateOrderUseCase";

export class OrderControllerFactory {
    static make() {
        const repository = new OrderRepositoryImpl()
        const getListOrderUseCase = new GetListOrderUseCase(repository);
        const createOderUseCase = new CreateOrderUseCase(repository);
        return new OrderController(
            getListOrderUseCase,
            createOderUseCase,
        );
    }
}