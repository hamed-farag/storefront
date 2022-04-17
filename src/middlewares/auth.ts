import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHead: string | undefined = req.headers.authorization; // "bearer USER_TOKEN"
        const token: string = authHead ? authHead.split("bearer ")[1] : ""; // extract USER TOKEN

        jwt.verify(token, process.env.JWT_SECRET as string, (err: any, data: any) => {
            if (err) return res.sendStatus(403);

            res.locals.userData = { id: data };
            next();
        });
    } catch (error: any) {
        error.code = 500;
        next(error);
    }
};
