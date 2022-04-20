import supertest from "supertest";
import { serverApp as expressServerApp } from "../../index";

import { UserInterface, UserCreatedReturnType } from "../../interfaces/User";

const request = supertest(expressServerApp);

const uuiRgEx =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

describe("/User APIs", function () {
    let user: UserInterface;

    beforeEach(() => {
        user = {
            firstName: "Super",
            lastName: "User",
            email: "user.2022@email.com",
            password: "P@sse0rd",
            gender: "male",
        };
    });

    it("Sign Up API", async () => {
        const res = await request
            .post("/api/v1/user/signup")
            .send(user)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            token: "eyJhbGciOiJIUzI1NiJ9.Mjg0ODI3NGYtMGFlZS00MTIyLWJjM2EtNTU3YTcxZWJkOGNk.N0xye0hc01xfPBe2ugkfldjXTyRqrgJ3ebpnaIlNy_Q",
        });
    });

    it("Sign In API", async () => {
        const res = await request
            .post("/api/v1/user/signin")
            .send({ email: user.email, password: user.password })
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            token: "eyJhbGciOiJIUzI1NiJ9.Mjg0ODI3NGYtMGFlZS00MTIyLWJjM2EtNTU3YTcxZWJkOGNk.N0xye0hc01xfPBe2ugkfldjXTyRqrgJ3ebpnaIlNy_Q",
            profile: {
                id: "65d4as65d4",
                firstName: "Super",
                lastName: "User",
                email: "user.2022@email.com",
                gender: "male",
            },
        });
    });
});
