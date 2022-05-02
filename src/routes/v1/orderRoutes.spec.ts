import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";

import { serverApp as expressServerApp } from "../../index";

import { UserInterface } from "../../interfaces/User";
import { CategoryCreatedReturnType } from "../../interfaces/Category";

import { ProductReturnType } from "../../interfaces/Product";
import { OrderReturnType } from "../../interfaces/Order";

const request = supertest(expressServerApp);

describe("/Order APIs", function () {
    const email = `${uuidv4()}@testAPI.com`;
    const password = "P@ssw0rd";

    let token: string;

    let user: UserInterface;
    let category: CategoryCreatedReturnType;
    let product: ProductReturnType;
    let order: OrderReturnType;

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

        const productRes = await request
            .post("/api/v1/product/")
            .send({
                name: `product_${uuidv4()}`,
                price: 100,
                categoryId: category.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        product = productRes.body;
    });

    afterAll(async function () {
        await request
            .delete("/api/v1/product/")
            .send({
                id: product.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        await request
            .delete("/api/v1/category/")
            .send({
                id: category.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");
    });

    it("Create Order API", async () => {
        const res = await request
            .post("/api/v1/order/")
            .send({
                products: [
                    {
                        id: product.id,
                        quantity: 1,
                    },
                ],
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.status).toBeDefined();
        expect(res.body.userid).toBeDefined();
        expect(res.body.status).toEqual("active");

        order = res.body;
    });

    it("Get Order By Id API", async () => {
        const res = await request
            .get(`/api/v1/order/${order.id}`)
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.status).toBeDefined();
        expect(res.body.orderid).toEqual(order.id);
        expect(res.body.status).toEqual("active");
    });

    it("Update Order Status API", async () => {
        const res = await request
            .put("/api/v1/order/")
            .send({
                id: order.id,
                status: "canceled",
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.status).toEqual("canceled");
    });

    it("Delete Order API", async () => {
        const res = await request
            .delete("/api/v1/order/")
            .send({
                id: order.id,
            })
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
        expect(res.body.id).toEqual(order.id);
    });
});
