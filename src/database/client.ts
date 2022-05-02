import { Pool } from "pg";

export function getDBClient(): Pool {
    const env = process.env.NODE_ENV;

    const {
        DB_HOST,
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
        DB_PORT,
        DB_HOST_TEST,
        DB_NAME_TEST,
        DB_USER_TEST,
        DB_PASSWORD_TEST,
    } = process.env;

    const dbConfig = {
        host: env === "development" ? DB_HOST : DB_HOST_TEST,
        name: env === "development" ? DB_NAME : DB_NAME_TEST,
        user: env === "development" ? DB_USER : DB_USER_TEST,
        password: env === "development" ? DB_PASSWORD : DB_PASSWORD_TEST,
        port: Number(DB_PORT),
    };

    const client = new Pool({
        host: dbConfig.host,
        database: dbConfig.name,
        user: dbConfig.user,
        password: dbConfig.password,
        port: dbConfig.port,
    });

    return client;
}
