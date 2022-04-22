import { PoolClient, QueryResult, DatabaseError } from "pg";
import { v4 as uuidv4 } from "uuid";

import { getDBClient } from "../../database/client";
import { parseError } from "../../database/errors";

import UUID from "../../types/UUID";

import { Order, OrderProduct } from "../../interfaces/Order";

export async function createOrder(order: Order) {
    const { userId, status, products } = order;

    const generatedOrderId = uuidv4();

    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `INSERT INTO "Order" (id, userid, status) VALUES($1, $2, $3) RETURNING *`;
        const result: QueryResult = await conn.query(sql, [generatedOrderId, userId, status]);

        if (result.rows.length > 0) {
            products.forEach(async (product) => {
                const generatedOrderProductId = uuidv4();
                const sql: string = `INSERT INTO "Order_Products" (id, orderid, productid, quantity) VALUES($1, $2, $3, $4)`;
                await conn.query(sql, [
                    generatedOrderProductId,
                    generatedOrderId,
                    product.id,
                    product.quantity,
                ]);
            });
        }

        conn.release();
        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not create Order with Products. Error: ${parseError(
                err as unknown as DatabaseError
            )}`
        );
    }
}

export async function getOrderById(id: UUID) {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `SELECT * FROM "Order" INNER JOIN "Order_Products" ON "Order".id = "Order_Products".orderid where "Order".id = $1`;
        const result: QueryResult = await conn.query(sql, [id]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Get Order with Products. Error: ${parseError(
                err as unknown as DatabaseError
            )}`
        );
    }
}

export async function deleteOrderById(id: UUID) {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `DELETE FROM "Order" WHERE id = $1 RETURNING *`;
        const result: QueryResult = await conn.query(sql, [id]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Delete Order with Products. Error: ${parseError(
                err as unknown as DatabaseError
            )}`
        );
    }
}

export async function updateOrderStatusById(id: UUID, status: string) {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `UPDATE "Order" SET status = $2 WHERE id = $1 RETURNING *`;
        const result: QueryResult = await conn.query(sql, [id, status]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(
            `Could not Update Order's Status. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}
