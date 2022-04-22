import { PoolClient, QueryResult, DatabaseError } from "pg";
import { v4 as uuidv4 } from "uuid";

import { getDBClient } from "../../database/client";
import { parseError } from "../../database/errors";

import {
    ProductReturnType,
    ProductFullInterface,
    ProductInterface,
} from "../../interfaces/Product";

export async function createProduct(product: ProductInterface): Promise<ProductReturnType> {
    try {
        const { name, price, categoryId } = product;
        const generateProductId = uuidv4();
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `INSERT INTO "Product" (id, name, price, categoryid) VALUES($1, $2, $3, $4) RETURNING *`;
        const result: QueryResult = await conn.query(sql, [
            generateProductId,
            name,
            price,
            categoryId,
        ]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not create Product. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function updateProduct(product: ProductFullInterface): Promise<ProductReturnType> {
    try {
        const { id, name, price, categoryId } = product;
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `UPDATE "Product" SET name = $2, price = $3, categoryid = $4 where id = $1 RETURNING *`;
        const result: QueryResult = await conn.query(sql, [id, name, price, categoryId]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Update Product. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function deleteProductById(id: string) {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `DELETE FROM "Product" where id = $1 RETURNING *`;
        const result: QueryResult = await conn.query(sql, [id]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Delete Product. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function getProductBy(
    key: string,
    value: string | number
): Promise<ProductReturnType> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `SELECT * FROM "Product" WHERE ${key} = $1;`;

        const result: QueryResult = await conn.query(sql, [value]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Get Product by Name. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function getProducts(): Promise<ProductReturnType[]> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `SELECT * FROM "Product"`;

        const result: QueryResult = await conn.query(sql);
        conn.release();

        return result.rows;
    } catch (err) {
        throw new Error(
            `Could not Get Products. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}
