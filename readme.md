# Boxit API - Documentación

Este proyecto es una API REST desarrollada con Express.js y TypeScript siguiendo la arquitectura hexagonal. Utiliza SQL
Server con Sequelize para la base de datos principal y MongoDB para el almacenamiento de logs de actividad. La API
permite gestionar productos, usuarios, pedidos y generar reportes en tiempo real.

- Node.js con Express.js
- TypeScript
- Sequelize para SQL Server
- MongoDB para almacenamiento de logs
- Docker y Docker Compose
- JWT para autenticación
- WebSockets (SocketIO)

## Demo
[![Ver el video](https://img.youtube.com/owkM1DgPwO0/0.jpg)](https://youtu.be/owkM1DgPwO0)



## Instalación y Ejecución

1. Clonar el repositorio

```sh
https://github.com/bolhy91/boxit-api
```

2. Configurar Variables de Entorno

```sh
NODE_ENV=development
PORT=3000
MSSQL_DB=master
MSSQL_HOST=mssql
ACCEPT_EULA=1
MSSQL_USER=SA
SA_PASSWORD=reallyStrongPwd123
MSSQL_PID=Developer
MONGO_URI=mongodb://mongodb:27017/boxit_log
MONGO_DB=boxit_log
```
Crear un archivo .env en la raiz del proyecto.

3. Ejecutar con Docker Compose

Se implementa Dockerfile y docker-compose.yml para crear un ambiente de desarrollo y poder trabajar con **Mongodb** y **Sql Server**.
En el docker-compose.yml puede ver la configuraciones para usar estas base de datos. 
Solo debe tener instalado docker y correr el siguiente comando en su terminal:

```sh
docker-compose up -d
```

Esto iniciará los servicios necesarios (API, SQL Server y MongoDB).

4. Migrar archivos SQL

```sh
/mssql/init.sql
/mssql/procedure.sql
/mssql/insertFake.sql
```

Docker corriendo puede proceder a ejecutar los SQL para migrar tablas y procedimiento almacenado.
**Opcional**: _Puede ejecutar el archivo insertFake.sql para migrar alguna data de ejemplo._

## Endpoints de la API

### Reportes en Vivo

Para conectarse al reporte debe conectarse en Postman:

```http request
ws://localhost:3000
```

_**En events (Postman) debe escuchar el evento `live_reports` y le da click a **Connect**. Con esto podra escuchar el
evento
y cuando se cree un pedido nuevo se envia el reporte al socket con las estadisticas nuevas.**_

Respuesta en el socket:
```json
{
    "users": [
        {
            "UserId": 3,
            "UserName": "marcos",
            "TotalOrders": 12,
            "TotalSpent": 9030
        },
        {
            "UserId": 1,
            "UserName": "Alejandra",
            "TotalOrders": 2,
            "TotalSpent": 1000
        },
        {
            "UserId": 2,
            "UserName": "Katherin",
            "TotalOrders": 2,
            "TotalSpent": 900
        }
    ],
    "sales": {
        "TotalSales": 10930,
        "TopProductID": 2,
        "TopProductName": "Product 2",
        "TopProductQuantity": 1180
    },
    "totalSales": 10930
}
```

### Autenticación

```http request
POST /users/login
```

```json
{
  "email": "bebeto10@gmail.com",
  "password": "123456"
}
```

#### Registro Usuario

```http request
PATCH /users/register
```

```json
{
  "name": "William",
  "email": "william@gmail.com",
  "password": "123456"
}
```

### Crear Pedido

```http request
POST /orders
```

```json
{
  "userId": 1,
  "date": "2025-02-31",
  "total": 800.00,
  "items": [
    {
      "productId": 2,
      "quantity": 50,
      "priceUnit": 30
    }
  ]
}
```

### Listar Pedido o Buscar por usuario

```http request
GET /orders o /orders?user=bebeto
```

### Listar Productos

```http request
GET /products
```

```json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 110,
    "stock": 2000,
    "category": "Nada"
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 500,
    "stock": 220,
    "category": "phone"
  }
]
```

### Buscar Producto por ID

```http request
GET /products/1
```

### Remover Producto por ID

```http request
DELETE /products/1
```

### Crear Producto

```http request
POST /products
```

PAYLOAD

```json
{
  "name": "Product 1",
  "price": 110.00,
  "stock": 2000,
  "category": "air cool"
}
```

### Actualizar Producto por ID

```http request
PATCH /products/1
```

PAYLOAD

```json
{
  "name": "Product 1",
  "price": 110.00,
  "stock": 2000,
  "category": "air cool"
}
```
## License

MIT

**Autor: Bolivar Cortes**





