import { PoolClient, QueryResult, DatabaseError } from "pg";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { getDBClient } from "../../database/client";
import { parseError } from "../../database/errors";

import { generateToken } from "../../utils/tokenizer";

import {
    UserInterface,
    UserCreatedReturnType,
    UserFullGetType,
    UserFullGetReturnedType,
    UserProfileGetType,
} from "../../interfaces/User";

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
        const error = parseError(err as DatabaseError);
        return { token: null, error: `Could not create user. Error: ${error}` };
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
            profile: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                gender: "",
            },
            error: `Could not retrieve user.`,
        };
    } catch (err) {
        const error = parseError(err as DatabaseError);
        return {
            token: null,
            profile: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                gender: "",
            },
            error: `Could not retrieve user. Error: ${error}`,
        };
    }
}

export async function deleteUserByEmail(
    email: string
): Promise<UserProfileGetType | { error: string }> {
    try {
        const conn: PoolClient = await getDBClient().connect();
        const sql: string = `DELETE FROM "User" where email = $1 RETURNING *`;
        const result: QueryResult = await conn.query(sql, [email]);
        conn.release();

        return result.rows[0];
    } catch (err) {
        const error = parseError(err as DatabaseError);
        return {
            error: `Could not Delete User. Error: ${error}`,
        };
    }
}
