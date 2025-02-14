export interface IUserReport {
    UserId: number;
    UserName: string;
    TotalOrders: string;
    TotalSpent: string;
}

export interface ISaleReport {
    TotalSales: number;
    TopProductID: number;
    TopProductName: string;
    TopProductQuantity: number;
}