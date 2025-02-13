import {OrderRepositoryImpl} from "../../infrastructure/repository/OrderRepositoryImpl";
import {GetListOrderUseCase} from "../usecases/orders/GetListOrderUseCase";
import {OrderController} from "../../infrastructure/adapters/controllers/OrderController";

export class OrderControllerFactory {
    static make() {
        const repository = new OrderRepositoryImpl()
        const getListOrderUseCase = new GetListOrderUseCase(repository);
        return new OrderController(
            getListOrderUseCase,
        );
    }
}