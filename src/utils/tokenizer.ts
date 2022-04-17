import jsonwebtoken from "jsonwebtoken";

export const generateToken: Function = (id: string): string => {
    return jsonwebtoken.sign(id, process.env.JWT_SECRET as string);
};
