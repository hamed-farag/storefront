import jwt from "jsonwebtoken";

export const generateToken: Function = (id: string): string => {
    return jwt.sign(id, process.env.JWT_SECRET as string);
};
