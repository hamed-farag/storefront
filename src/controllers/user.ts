import { Request, Response } from "express";

export function signUpUser(req: Request, res: Response) {
    res.send("SIGN_UP");
}

export function signInUser(req: Request, res: Response) {
    res.send("SIGN_IN");
}
