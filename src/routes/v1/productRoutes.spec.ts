import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";

import { serverApp as expressServerApp } from "../../index";

import { UserInterface } from "../../interfaces/User";
import { CategoryCreatedReturnType } from "../../interfaces/Category";

import { ProductReturnType } from "../../interfaces/Product";

const request = supertest(expressServerApp);

describe("/Product APIs", function () {
    const email = `${uuidv4()}@testAPI.com`;
    const password = "P@ssw0rd";

    let token: string;

    let user: UserInterface;
    let category: CategoryCreatedReturnType;
    let product: ProductReturnType;

    beforeAll(async () => {
        user = {
            firstName: "Super",
            lastName: "User",
            email: email,
            password: password,
            gender: "male",
        };

        const userRes = await request
            .post("/api/v1/user/signup")
            .send(user)
            .set("Accept", "application/json");

        token = userRes.body.token;

        const categoryRes = await request
            .post("/api/v1/category/")
            .send({
                name: `category_${uuidv4()}`,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        category = categoryRes.body;
    });

    afterAll(async function () {
        await request
            .delete("/api/v1/category/")
            .send({
                id: category.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");
    });

    it("Create Product API", async () => {
        const productName = `product_${uuidv4()}`;
        const price = 100;
        const res = await request
            .post("/api/v1/product/")
            .send({
                name: productName,
                price: price,
                categoryId: category.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.name).toBeDefined();
        expect(res.body.price).toBeDefined();
        expect(res.body.name).toEqual(productName);
        expect(res.body.price).toEqual(price.toString());

        product = res.body;
    });

    it("Get All Products API", async () => {
        const res = await request
            .get("/api/v1/product/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.length).toEqual(1);
    });

    it("Get Product By Id API", async () => {
        const res = await request
            .get(`/api/v1/product/${product.id}`)
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.id).toEqual(product.id);
    });

    it("Update Product API", async () => {
        const newProductName = `product_${uuidv4()}`;
        const res = await request
            .put("/api/v1/product/")
            .send({
                id: product.id,
                name: newProductName,
                price: product.price,
                categoryId: product.categoryId,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.name).toEqual(newProductName);
    });

    it("Delete Product API", async () => {
        const res = await request
            .delete("/api/v1/product/")
            .send({
                id: product.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.id).toEqual(product.id);
    });
});
