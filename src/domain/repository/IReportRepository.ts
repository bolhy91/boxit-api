import {Report} from "../models/Report";

export interface IReportRepository {
    getReports(): Promise<Report>
}