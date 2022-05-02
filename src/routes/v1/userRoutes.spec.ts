import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";

import { serverApp as expressServerApp } from "../../index";

import { UserInterface } from "../../interfaces/User";

const request = supertest(expressServerApp);

describe("/User APIs", function () {
    const email = `${uuidv4()}@testAPI.com`;
    const password = "P@ssw0rd";

    let token: string;

    let user: UserInterface;

    beforeAll(() => {
        user = {
            firstName: "Super",
            lastName: "User",
            email: email,
            password: password,
            gender: "male",
        };
    });

    it("Sign Up API", async () => {
        const res = await request
            .post("/api/v1/user/signup")
            .send(user)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();

        token = res.body.token;
    });

    it("Sign In API", async () => {
        const res = await request
            .post("/api/v1/user/signin")
            .send({ email: user.email, password: user.password })
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.token).toEqual(token);
    });
});
