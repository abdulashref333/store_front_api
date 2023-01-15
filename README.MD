# Introduction

<p>E-commerce API made with typescript, express ,PostgreSQL with all the basic features and more !!</p>

# Technologies

- Nodejs
- Expressjs
- Typescript
- PostgreSQL
- db-migrate(tool) !important for doing migration stuff.
## Requirments

1. [Node & NPM ⬇️](https://nodejs.org/en/) - (node v16), (npm v8)
2. [PostgreSQL ⬇️](https://www.postgresql.org/download/) - (v14)

# Environment Variables

&nbsp;

```ENV
ENV=dev

DB_HOST=127.0.0.1
DB_NAME=store_front_api_dev
DB_USERNAME=admin_user

DB_TEST_NAME=store_front_test_api
DB_TEST_USERNAME=test_admin_user
DB_PASSWORD=password123
JWT_KEY=jsonwebtokensecret22

EXTRA_PASSWORD=22endof@year
```
# DB Setup
1. first connect to psql  
- **Ubuntu**
```bash
sudo -u postgres psql
```
- **windows**
```bash
psql -U postgres
```
2. create the database

- **developement db**
```
// .
CREATE USER admin_user WITH PASSWORD 'password123';
CREATE DATABASE store_front_api_dev;
\c store_front_api_dev
GRANT ALL PRIVILEGES ON DATABASE store_front_api_dev TO admin_user;
```
- **testing db**
```
CREATE USER test_admin_user WITH PASSWORD 'password123';
CREATE DATABASE store_front_test_api;
GRANT ALL PRIVILEGES ON DATABASE store_front_test_api TO test_admin_user;

```

3. setup database.json file (incase you created the db using the commands upove use the same json below.)
```
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "store_front_api_dev",
    "user": "admin_user",
    "password": "password123"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "store_front_test_api",
    "user": "test_admin_user",
    "password": "password123"
  }
}
```
4. db-migrate .
    - To install db-migrate 
    ```
    npm i -g db-migrate
    ```
    - after installaion run 
    ```
    db-migrate up
    ```

&nbsp;
# How to run 
1. to install dependencies : &nbsp;&nbsp; ``` npm install ```
2. to start the app :&nbsp;&nbsp; ``` npm start ```
3. to run the test:&nbsp;&nbsp; ```  npm run test ```

# API-ROUTES

⭕ YOU CAN ACCESS THE SERVER IN localhost:3000
```Base URL
http://localhost:3000/api/
```
- **please note that the body should be send in *JSON* formate**
&nbsp;

|            Routes             | Method |          Description          |        Schema                    |
| :---------------------------: | :----: | :---------------------------: | :---------------------------:    |
|                               | Users  
|      /api/users               |  POST  |        Register a User        |{firstname: string, lastname: string, email: string, password: string}
|      /api/users/login         |  POST  |         Login A user          |{email:string, password:"string"} |
|      /api/users/me            |  GET   |       Get A user profile      |                                  |
|      /api/users/:id           |  GET   |       Get A user By Id        |                                  |
|                               | Products  
|         /api/products         |  GET   |         Get Products          |
|      /api/products/:id        |  GET   |    Get Individual product     |
|     /api/products/:id          | DELETE |       Delete A Product        |
|      /api/products            |  POST  |       Insert A Product        |{price: number, title: string, summary:string, image_url:string}|
|      /api/products/:id        | PATCH  |        Update Product         | it could be the same fields as post request or less
|                               | Orders  
|      /api/orders              |  GET   |          Gets Order           |
|      /api/orders/:id          |  GET   | Get Individual Order Detailes |
|       /api/orders             |  POST  |     Add new order             |{customer_id: number, total: number, order_status: string, payment_type: string}
|       /api/orders/:id         | PATCH  |      Update Order             | it could be the same fields as post request or less
|       /api/orders/:id         | DELETE |      Delete Order             |
|   /api/orders/products        | POST   |   add products to order       |{products: [{product_id: number, quantity: number}]}
|     /api/orders/products/:pid | POST   |   add product to order        |{quantity: number}

&nbsp;
### Routes that need a token are listed below :  
- /api/users/:id > (GET)
- /api/users/me > (GET)
- /api/products/ > (POST) 
- /api/products/:id > (DELETE - PATCH) 
- All orders endpoints withe  > (POST - GET - PATCH - DELETE) 

### TOKEN TYPE:  
- You should provide a Bearer token in authorization header as shown below.

![file_structure](/doc/authorization.png)

&nbsp;
### Please look at REQUIRMENT.md file to see the API routes.
