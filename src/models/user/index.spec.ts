import { createUser, getUserByEmailAndPassword, deleteUserByEmail } from "./";
import { UserInterface, UserCreatedReturnType } from "../../interfaces/User";

import dotenv from "dotenv";
import path from "path";

//  to resolve "Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
dotenv.config({
    path: `${path.join(__dirname, `../../../../.env.development`)}`,
});

describe("User Model", () => {
    let user: UserInterface;

    beforeEach(() => {
        user = {
            firstName: "Super",
            lastName: "User",
            email: "user@email.com",
            password: "P@sse0rd",
            gender: "male",
        };
    });

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
        // expect(result.token).toEqual("adfayusd98yas0d8fas-90dfuasdf");
    });

    it("should get a user normally using getUserByEmailAndPassword method (SignIn Method)", async () => {
        const result: UserCreatedReturnType = await getUserByEmailAndPassword(
            user.email,
            user.password
        );

        expect(result.token).toBeDefined();
        // expect(result.token).toEqual("sdfsdkfuys9df8ysd9fysdf");
    });
});
