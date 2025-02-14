import {ISaleReport, IUserReport} from "../interfaces/IReport";

export class Report {
    constructor(
        users: IUserReport[],
        sales: ISaleReport,
        totalSales: number
    ) {
    }
}