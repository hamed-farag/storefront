import { Request, Response } from "express";

import { createUser, getUserByEmailAndPassword } from "../models/user";
import { UserCreatedReturnType, UserFullGetReturnedType } from "../interfaces/User";

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
            return res.status(422).send({ ...errors.MISSING_PARAMS });
        }

        const newUser: UserCreatedReturnType = await createUser(req.body);
        if (newUser.token === null) {
            return res.status(500).json({ error: newUser.error });
        }
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ ...errors.USER_CREATE_ERROR });
    }
}

export async function signInUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (stringer.isEmptyOrNull(email) || stringer.isEmptyOrNull(password)) {
            return res.status(422).send({ ...errors.MISSING_PARAMS });
        }

        const user: UserFullGetReturnedType = await getUserByEmailAndPassword(email, password);
        if (user.token) {
            return res.status(200).json(user);
        }

        return res.status(404).json({ ...errors.USER_NOT_FOUND });
    } catch (error) {
        return res.status(500).json({ ...errors.USER_GET_ERROR });
    }
}
