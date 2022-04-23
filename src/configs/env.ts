import dotenv from "dotenv";
import path from "path";

export default function setup() {
    const currentEnv = process.env.NODE_ENV;

    if (currentEnv === "development") {
        dotenv.config({
            path: `${path.join(__dirname, `../../.env`)}`,
        });
    } else {
        dotenv.config({
            path: `${path.join(__dirname, `../../.env.${currentEnv}`)}`,
        });
    }
}
