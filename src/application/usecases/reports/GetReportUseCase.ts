import {Order} from "../../../domain/models/order";
import {IReportRepository} from "../../../domain/repository/IReportRepository";

export class GetReportUseCase {
    constructor(private reportRepository: IReportRepository) {
    }

    async execute() {
        return await this.reportRepository.getReports();
    }
}