import dotenv from "dotenv";
import path from "path";

import { createUser, getUserByEmailAndPassword, deleteUserByEmail } from "./";
import {
    UserInterface,
    UserCreatedReturnType,
    UserFullGetReturnedType,
} from "../../interfaces/User";

//  to resolve "Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
dotenv.config({
    path: `${path.join(__dirname, `../../../../.env.test`)}`,
});

describe("User Model", () => {
    const user: UserInterface = {
        firstName: "Super",
        lastName: "User",
        email: "user@gmail.com",
        password: "P@sse0rd",
        gender: "male",
    };

    it("should have a createUser method", () => {
        expect(createUser).toBeDefined();
    });

    it("should have a getUserByEmailAndPassword method", () => {
        expect(getUserByEmailAndPassword).toBeDefined();
    });

    it("should have a deleteUserByEmail method", () => {
        expect(deleteUserByEmail).toBeDefined();
    });

    it("should create a user normally using createUser method (SignUp Method)", async () => {
        const result: UserCreatedReturnType = await createUser(user);

        expect(result.token).toBeDefined();
    });

    it("should get a user normally using getUserByEmailAndPassword method (SignIn Method)", async () => {
        const result: UserFullGetReturnedType = await getUserByEmailAndPassword(
            user.email,
            user.password
        );

        expect(result.token).toBeDefined();
        expect(result.profile).toBeDefined();
    });
});
