CREATE PROCEDURE stores.GetSalesReports
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @TotalSales DECIMAL(18, 2);
    SELECT @TotalSales = ISNULL(SUM(o.total), 0)
    FROM stores.Orders o
    WHERE o.date >= CAST(GETDATE() AS DATE)
      AND o.date < DATEADD(DAY, 1, CAST(GETDATE() AS DATE));

    DECLARE @TopProductID INT, @TopProductName NVARCHAR(255), @TopProductQuantity INT;
    SELECT TOP 1 @TopProductID = od.product_id,
                 @TopProductName = p.name,
                 @TopProductQuantity = SUM(od.quantity)
    FROM stores.OrderDetails od
             INNER JOIN stores.Products p ON od.product_id = p.id
             INNER JOIN stores.Orders o ON od.order_id = o.id
    GROUP BY od.product_id, p.name
    ORDER BY SUM(od.quantity) DESC;

    SELECT TOP 5 u.id         AS UserId,
                 u.name       AS UserName,
                 COUNT(o.id)  AS TotalOrders,
                 SUM(o.total) AS TotalSpent
    FROM stores.Orders o
             INNER JOIN stores.Users u ON o.user_id = u.id
    GROUP BY u.id, u.name
    ORDER BY TotalSpent DESC;

    SELECT @TotalSales         AS TotalSales,
           @TopProductID       AS TopProductID,
           @TopProductName     AS TopProductName,
           @TopProductQuantity AS TopProductQuantity;
END;
GO