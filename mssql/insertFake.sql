SET IDENTITY_INSERT stores.Users ON;
insert into stores.Users (id, name, email, password)
values (1, N'Alejandra', N'blla@gmail.com', N'$2b$10$DoPPgwftjbSMoPz4efH85OBCA3y5TMFkSD79D.A1NoG33w5W98oqG'),
       (2, N'Katherin', N'kath@gmail.com', N'$2b$10$DoPPgwftjbSMoPz4efH85OBCA3y5TMFkSD79D.A1NoG33w5W98oqG'),
       (3, N'marcos', N'marco@gmail.com', N'$2b$10$DoPPgwftjbSMoPz4efH85OBCA3y5TMFkSD79D.A1NoG33w5W98oqG'),
       (4, N'Bebeto', N'bebeto10@gmail.com', N'$2b$10$Rj7vw8p09F5uZDRvmh1yUu25ebrkjxsyGn1Nzvr4Zyks5pubPTb9S');
SET IDENTITY_INSERT stores.Users OFF;

SET IDENTITY_INSERT stores.Products ON;
insert into stores.Products (id, name, price, stock, category)
values (1, N'Product 1', 110.0000, 2000, N'shirt'),
       (2, N'Product 2', 500.0000, 220, N'phone'),
       (3, N'Product 3', 11.0000, 100, N'tv'),
       (4, N'Product 4', 11.0000, 100, N'tablet'),
       (1002, N'Product 5', 11.0000, 100, N'air cool');
SET IDENTITY_INSERT stores.Products OFF;

SET IDENTITY_INSERT stores.Orders ON;
insert into stores.Orders (id, user_id, date, total)
values (2, 1, N'2025-02-14', 200.00),
       (3, 2, N'2025-02-14', 100.00),
       (4, 3, N'2025-02-14', 230.00),
       (5, 1, N'2025-02-14', 800.00),
       (6, 2, N'2025-02-14', 800.00),
       (7, 3, N'2025-02-14', 800.00),
       (8, 3, N'2025-02-14 06:19:02', 800.00),
       (9, 3, N'2025-02-14 06:21:25', 800.00),
       (10, 3, N'2025-02-14 06:21:45', 800.00),
       (11, 3, N'2025-02-14 06:21:49', 800.00),
       (12, 3, N'2025-02-14 06:22:07', 800.00);
SET IDENTITY_INSERT stores.Orders OFF;

SET IDENTITY_INSERT stores.OrderDetails ON;
SET IDENTITY_INSERT stores.OrderDetails ON;
insert into stores.OrderDetails (id, order_id, product_id, quantity, price_unit)
values (1, 2, 2, 10, 20.0000),
       (2, 6, 4, 190, 30.0000),
       (3, 3, 1, 20, 600.0000),
       (4, 3, 2, 100, 30.0000),
       (5, 4, 2, 10, 30.0000),
       (6, 5, 2, 10, 30.0000),
       (7, 7, 2, 600, 30.0000),
       (8, 8, 2, 50, 30.0000),
       (9, 9, 2, 50, 30.0000),
       (10, 10, 2, 50, 30.0000),
       (11, 11, 2, 50, 30.0000),
       (12, 12, 2, 50, 30.0000);
SET IDENTITY_INSERT stores.OrderDetails OFF;
SET IDENTITY_INSERT stores.OrderDetails OFF;