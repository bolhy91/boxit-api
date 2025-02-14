import {Sequelize} from "sequelize-typescript";
import {Database} from "../database/sql/SqlSeverDatabase";
import {IReportRepository} from "../../domain/repository/IReportRepository";
import {Report} from "../../domain/models/Report";
import {config} from "../config/dotenv";
import {ISaleReport, IUserReport} from "../../domain/interfaces/IReport";

export class ReportRepositoryImpl implements IReportRepository {
    private readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = Database.getInstance()
    }

    async getReports(): Promise<Report> {
        const result = await this.sequelize.query(`EXEC ${config.procedure.reports}`);
        const rawData = result[0] || [];
        const users = rawData.filter((item: any) => item.UserId !== undefined) as IUserReport[];
        const salesInfo = rawData.find((item: any) => item.TotalSales !== undefined) as ISaleReport || {};
        const totalSales: number = salesInfo.TotalSales || 0;
        return {users, sales: salesInfo, totalSales}
    }
}