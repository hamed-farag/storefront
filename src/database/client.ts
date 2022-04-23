import { Pool } from "pg";

export function getDBClient(): Pool {
    const { DB_HOST, DB_NAME, DB_NAME_TEST, DB_USER, DB_PASSWORD } = process.env;

    const client = new Pool({
        host: DB_HOST,
        database: process.env.NODE_ENV === "development" ? DB_NAME : DB_NAME_TEST,
        user: DB_USER,
        password: DB_PASSWORD,
    });

    return client;
}
