import { Request, Response } from "express";

import { createUser, getUserByEmail } from "../models/user";
import { UserCreatedReturnType, UserGetReturnedType } from "../interfaces/User";

import stringer from "../utils/string";

import errors from "../constants/errors";

export async function signUpUser(req: Request, res: Response) {
    try {
        const { firstName, lastName, email, gender, password } = req.body;

        if (
            stringer.isEmptyOrNull(firstName) ||
            stringer.isEmptyOrNull(lastName) ||
            stringer.isEmptyOrNull(email) ||
            stringer.isEmptyOrNull(gender) ||
            stringer.isEmptyOrNull(password)
        ) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const user: UserGetReturnedType = await getUserByEmail(email);
        if (user.id) {
            return res.status(409).json({ ...errors.USER_ALREADY_EXIST });
        }

        const newUser: UserCreatedReturnType = await createUser(req.body);
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ ...errors.USER_CREATE_ERROR });
    }
}

export function signInUser(req: Request, res: Response) {
    res.send("SIGN_IN");
}
