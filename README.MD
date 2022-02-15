# Introduction

<p>E-commerce API made with typescript, express ,PostgreSQL with all the basic features and more !!</p>

# Technologies

- Nodejs
- Expressjs
- Typescript
- PostgreSQL
- db-migrate(tool) !important for doing migration stuff.

# File Structure

![GitHub Logo](_readme_img/file_structure.png)

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
please note that this setup for linux users.
```
/* open your terminal */
sudo -u postgres psql

/* 
  - you need to creat two databases one for dev and another for test
  - follow the commands below to do that.
*/

CREATE USER username WITH PASSWORD 'password123';
CREATE DATABASE database_name;
\c database_name
GRANT ALL PRIVILEGES ON DATABASE database_name TO username;
```
&nbsp;
### Install db-migrate gloabally.
```
npm i -g db-migrate
```