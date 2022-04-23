# StoreFront NodeJS Application

NodeJS RESTful APIs Application for an online store.

## 📙 Database Setup

For creating StoreFront Database, you need to follow the below points:

### For Dev Environment

-   Connect to the default Postgres Database instance as root user `psql -U postgres`.
-   Create a new user `CREATE USER ud_user WITH PASSWORD 'ud_pass@word';`.
-   Create a database called **ud_storefront** `CREATE DATABASE ud_storefront;`.
-   Connect to database and grant all privileges to the user **ud_storefront**.
    -   `\c ud_storefront`
    -   `GRANT ALL PRIVILEGES ON DATABASE ud_storefront TO ud_user;`

### For Test Environment

-   Connect to the default Postgres Database instance as root user `psql -U postgres`.
-   Create a new user `CREATE USER ud_user WITH PASSWORD 'ud_pass@word';`.
-   Create a database called **ud_test_storefront** `CREATE DATABASE ud_storefront_test;`.
-   Connect to database and grant all privileges to the user **ud_storefront_test**.
    -   `\c ud_test_storefront`
    -   `GRANT ALL PRIVILEGES ON DATABASE ud_test_storefront TO ud_user;`

---

## Environment Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file.

```
PORT = 8080

DB_HOST = "127.0.0.1"
DB_NAME = "ud_storefront"
DB_NAME_TEST = "ud_storefront_test"
DB_USER = "ud_user"
DB_PASSWORD = "ud_pass@word"
DB_PORT = 5432

BCRYPT_PASSWORD = "Ud@cItYy2022"
SALT_ROUNDS = 10
JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MDIxNDQ4NCwiaWF0IjoxNjUwMjE0NDg0fQ.PzOAKz56zpFTm8e5lxzwv5bL5-4pM5yAz-IsskRIibg"


```

---

## 📄 Available Scripts

Install Node Modules Packages

### `npm run start`

Runs the app in the development mode.
Open [Swagger UI Documentation](http://localhost:8080/api/v1/) to view it in your browser Or You can Download [Postman Collection](https://raw.githubusercontent.com/hamed-farag/storefront/master/Storefront.postman_collection.json).

### `npm run build`

Builds the app for production environment to the `build` folder.

### `npm run test`

Run Available Unit Testing Cases
