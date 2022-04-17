import { PoolClient, QueryResult, DatabaseError } from "pg";

import { getDBClient } from "../database/client";
import { parseError } from "../database/errors";

import { CategoryCreatedReturnType } from "../interfaces/Category";

export async function createNewCategory(name: string): Promise<CategoryCreatedReturnType> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `INSERT INTO "Category" (name) VALUES($1) RETURNING *`;
        const result: QueryResult = await conn.query(sql, [name]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not create Category. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function getCategoryBy(
    key: string,
    value: string
): Promise<CategoryCreatedReturnType> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `SELECT * FROM "Category" WHERE ${key} = $1;`;

        const result: QueryResult = await conn.query(sql, [value]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Get Category by Name. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}
