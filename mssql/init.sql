use master;
GO
CREATE SCHEMA stores;
GO
CREATE TABLE stores.Products
(
    id       INT PRIMARY KEY IDENTITY (1,1),
    name     NVARCHAR(255) NOT NULL,
    price    MONEY         NOT NULL,
    stock    INT           NOT NULL,
    category NVARCHAR(100) NOT NULL
);
GO
CREATE TABLE stores.Users
(
    id       INT PRIMARY KEY IDENTITY (1,1),
    name     NVARCHAR(255) NOT NULL,
    email    NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL
);
GO
CREATE TABLE stores.Orders
(
    id      INT PRIMARY KEY IDENTITY (1,1),
    user_id INT            NOT NULL,
    date    NVARCHAR(255)       NOT NULL,
    total   DECIMAL(10, 2) NOT NULL,
    CONSTRAINT FK_Orders_Users FOREIGN KEY (user_id) REFERENCES stores.Users (id)
);
GO
CREATE TABLE stores.OrderDetails
(
    id         INT PRIMARY KEY IDENTITY (1,1),
    order_id   INT   NOT NULL,
    product_id INT   NOT NULL,
    quantity   INT   NOT NULL,
    price_unit MONEY NOT NULL,
    CONSTRAINT FK_OrderDetails_Orders FOREIGN KEY (order_id) REFERENCES stores.Orders (id),
    CONSTRAINT FK_OrderDetails_Products FOREIGN KEY (product_id) REFERENCES stores.Products (id)
);
GO