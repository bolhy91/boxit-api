import {OrderRepositoryImpl} from "../../infrastructure/repository/OrderRepositoryImpl";
import {GetListOrderUseCase} from "../usecases/orders/GetListOrderUseCase";
import {OrderController} from "../../infrastructure/adapters/controllers/OrderController";
import {CreateOrderUseCase} from "../usecases/orders/CreateOrderUseCase";
import {ReportRepositoryImpl} from "../../infrastructure/repository/ReportRepositoryImpl";
import {GetReportUseCase} from "../usecases/reports/GetReportUseCase";

export class OrderControllerFactory {
    static make() {
        const repository = new OrderRepositoryImpl();
        const reportRepository = new ReportRepositoryImpl();
        const getListOrderUseCase = new GetListOrderUseCase(repository);
        const createOderUseCase = new CreateOrderUseCase(repository);
        const reportUseCase = new GetReportUseCase(reportRepository);
        return new OrderController(
            getListOrderUseCase,
            createOderUseCase,
            reportUseCase,
        );
    }
}