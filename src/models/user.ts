import { PoolClient, QueryResult, DatabaseError } from "pg";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { getDBClient } from "../database/client";
import { parseError } from "../database/errors";

import { generateToken } from "../utils/tokenizer";

import {
    UserInterface,
    UserCreatedReturnType,
    UserGetReturnedType,
    UserFullGetType,
    UserFullGetReturnedType,
} from "../interfaces/User";

export async function createUser(user: UserInterface): Promise<UserCreatedReturnType> {
    try {
        const { firstName, lastName, email, gender, password } = user;

        const salt: string = process.env.SALT_ROUNDS as string;
        const hashedPassword: string = bcrypt.hashSync(password, parseInt(salt));

        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `INSERT INTO "User" (id, firstName, lastName, email, gender, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
        const generateUserId = uuidv4();
        const result: QueryResult = await conn.query(sql, [
            generateUserId,
            firstName,
            lastName,
            email,
            gender,
            hashedPassword,
        ]);
        conn.release();

        const id: string = result.rows[0].id;
        const token: string = generateToken(id.toString());
        return { token };
    } catch (err) {
        throw new Error(
            `Could not create user. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function getUserByEmailAndPassword(
    email: string,
    password: string
): Promise<UserFullGetReturnedType> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `SELECT id, firstName, lastName, email, gender, password from "User" where email = $1 limit 1`;

        const result: QueryResult = await conn.query(sql, [email]);
        conn.release();

        const user: UserFullGetType = result.rows[0];
        if (user?.id) {
            const isPasswordEqual = await bcrypt.compareSync(password, user.password);

            if (isPasswordEqual) {
                const token: string = generateToken(user.id.toString());
                return {
                    token,
                    profile: {
                        id: user.id,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email,
                        gender: user.gender,
                    },
                };
            }
        }
        return {
            token: null,
            profile: {},
        };
    } catch (err) {
        throw new Error(
            `Could not retrieve user. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}

export async function getUserByEmail(email: string): Promise<UserGetReturnedType> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `SELECT id FROM "User" WHERE email = $1;`;

        const result: QueryResult = await conn.query(sql, [email]);
        conn.release();

        const id: string = result.rows[0]?.id;

        return { id };
    } catch (err) {
        throw new Error(
            `Could not Get User by Email. Error: ${parseError(err as unknown as DatabaseError)}`
        );
    }
}