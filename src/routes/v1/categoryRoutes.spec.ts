import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";

import { serverApp as expressServerApp } from "../../index";

import { UserInterface } from "../../interfaces/User";
import { CategoryCreatedReturnType } from "../../interfaces/Category";

const request = supertest(expressServerApp);

const uuiRgEx =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

describe("/Category APIs", function () {
    const email = `${uuidv4()}@testAPI.com`;
    const password = "P@ssw0rd";

    let token: string;

    let user: UserInterface;
    let category: CategoryCreatedReturnType;

    beforeAll(async () => {
        user = {
            firstName: "Super",
            lastName: "User",
            email: email,
            password: password,
            gender: "male",
        };

        const res = await request
            .post("/api/v1/user/signup")
            .send(user)
            .set("Accept", "application/json");

        token = res.body.token;
    });

    it("Create Category API", async () => {
        const categoryName = `category_${uuidv4()}`;
        const res = await request
            .post("/api/v1/category/")
            .send({
                name: categoryName,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        category = res.body;

        expect(res.status).toBe(200);
        expect(res.body.name).toBeDefined();
        expect(res.body.name).toEqual(categoryName);
    });

    it("Get All Categories API", async () => {
        const res = await request
            .get("/api/v1/category/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.length).toEqual(1);
    });

    it("Get Category By Id API", async () => {
        const res = await request
            .get(`/api/v1/category/${category.id}`)
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.id).toEqual(category.id);
    });

    it("Update Category API", async () => {
        const newCategoryName = `category_${uuidv4()}`;
        const res = await request
            .put("/api/v1/category/")
            .send({
                id: category.id,
                name: newCategoryName,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.name).toEqual(newCategoryName);
    });

    it("Delete Category API", async () => {
        const res = await request
            .delete("/api/v1/category/")
            .send({
                id: category.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.id).toEqual(category.id);
    });
});
