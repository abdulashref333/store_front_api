# API-ROUTES

⭕ YOU CAN ACCESS THE SERVER IN localhost:3000
```Base URL
http://localhost
```

&nbsp;

|            Routes             | Method |          Description          |        Schema                    |
| :---------------------------: | :----: | :---------------------------: | :---------------------------:    |
|                               | Users  
|      /api/users               |  POST  |        Register a User        |
|      /api/users/login         |  POST  |         Login A user          |{email:string, password:"string"} |
|                               | Products  
|         /api/products         |  GET   |         Get Products          |
|      /api/products/:id        |  GET   |    Get Individual product     |
|     /api/product/:id          | DELETE |       Delete A Product        |
|      /api/products            |  POST  |       Insert A Product        |{price: number, title: string, summary:string, image_url:string}|
|      /api/products/:id        | PATCH  |        Update Product         |
|                               | Orders  
|      /api/orders              |  GET   |          Gets Order           |
|      /api/orders/:id          |  GET   | Get Individual Order Detailes |
|       /api/orders             |  POST  |     Add new order             |{customer_id:number, total: number, order_status: string, payment_type: string}
|       /api/orders/:id         | PATCH  |      Update Order             |
|       /api/orders/:id         | DELETE |      Delete Order             |
|   /api/orders/products        | POST   |   add products to order       |
|     /api/orders/products/:pid | POST   |   add product to order        |

&nbsp;

# DATABASE SCHEMA : 

&nbsp;
⭕Copy and Paste DB Model

```db
  /*user DB Design*/

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  /*product DB Design*/

  CREATE TABLE IF NOT EXISTS products(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(280) NOT NULL,
    image_url VARCHAR NOT NULL,
    summary VARCHAR(325) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  /*order DB Design*/

  CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    customer_id BIGINT NOT NULL REFERENCES users(id),
    total DECIMAL(12,2) NOT NULL,
    order_status VARCHAR(100),
    payment_type VARCHAR(40) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  /*order_products DB Design*/
  
  CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY NOT NULL,
    order_id BIGINT NOT NULL REFERENCES orders(id),
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
```