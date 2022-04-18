import { PoolClient, QueryResult, DatabaseError } from "pg";

import { getDBClient } from "../database/client";
import { parseError } from "../database/errors";

import { CategoryCreatedReturnType, CategoryInterface } from "../interfaces/Category";

export async function createCategory(name: string): Promise<CategoryCreatedReturnType> {
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

export async function updateCategory(
    category: CategoryInterface
): Promise<CategoryCreatedReturnType> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `UPDATE "Category" SET name = $2 where id = $1 RETURNING *`;
        const result: QueryResult = await conn.query(sql, [category.id, category.name]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Update Category. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function deleteCategoryById(id: string) {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `DELETE FROM "Category" where id = $1 RETURNING *`;
        const result: QueryResult = await conn.query(sql, [id]);
        conn.release();

        console.log("deeeelete", result);

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Delete Category. Error: ${parseError(err as unknown as DatabaseError)}`
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

export async function getCategories(): Promise<CategoryCreatedReturnType[]> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `SELECT * FROM "Category"`;

        const result: QueryResult = await conn.query(sql);
        conn.release();

        return result.rows;
    } catch (err) {
        throw new Error(
            `Could not Get Categories. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}
