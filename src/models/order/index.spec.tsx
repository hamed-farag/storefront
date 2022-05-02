import dotenv from "dotenv";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { createOrder, deleteOrderById, getOrderById, updateOrderStatusById } from "./";
import { createProduct, deleteProductById } from "../product";
import { createCategory, deleteCategoryById } from "../category";
import { createUser, getUserByEmailAndPassword } from "../user";

import { UserFullGetReturnedType } from "../../interfaces/User";
import { Order, OrderReturnType } from "../../interfaces/Order";
import { ProductReturnType } from "../../interfaces/Product";
import { CategoryInterface } from "../../interfaces/Category";

import UUID from "../../types/UUID";

//  to resolve "Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
dotenv.config({
    path: `${path.join(__dirname, `../../../../.env.test`)}`,
});

describe("Order Model", () => {
    let user: UserFullGetReturnedType;
    let order: Order;
    let product: ProductReturnType;
    let category: CategoryInterface;
    let createdOrder: OrderReturnType;

    beforeAll(async function () {
        const email = `${uuidv4()}@test.com`;
        const password = "P@ssw0rd";

        await createUser({
            email: email,
            firstName: "Super",
            lastName: "Admin",
            gender: "male",
            password: password,
        });

        user = await getUserByEmailAndPassword(email, password);

        category = await createCategory("category for test");
        product = await createProduct({
            categoryId: category.id,
            name: "product for test",
            price: 100,
        });

        order = {
            userId: user.profile.id as unknown as UUID,
            status: "active",
            products: [{ id: product.id as unknown as UUID, quantity: 1 }],
        };
    });

    afterAll(async function () {
        await deleteProductById(product.id);
        await deleteCategoryById(category.id);
    });

    it("should have a createOrder method", () => {
        expect(createOrder).toBeDefined();
    });

    it("should have a getOrderById method", () => {
        expect(getOrderById).toBeDefined();
    });

    it("should have a updateOrderStatusById method", () => {
        expect(updateOrderStatusById).toBeDefined();
    });

    it("should have a deleteOrderById method", () => {
        expect(deleteOrderById).toBeDefined();
    });

    it("should create an order normally using createOrder method", async () => {
        const result: OrderReturnType = await createOrder(order);

        createdOrder = result;

        expect(result.id).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.status).toEqual(order.status);
        expect(result.userid).toEqual(user.profile.id);
    });

    it("should get an order normally using getOrderById method", async () => {
        const result: OrderReturnType = await getOrderById(createdOrder.id);

        expect(result.id).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.status).toEqual(order.status);
        expect(result.userid).toEqual(user.profile.id);
    });

    it("should update an order normally using updateOrderStatusById method", async () => {
        const result: OrderReturnType = await updateOrderStatusById(createdOrder.id, "complete");

        expect(result.id).toBeDefined();
        expect(result.status).toBeDefined();
        expect(result.status).toEqual("complete");
        expect(result.userid).toEqual(user.profile.id);
    });

    it("should delete an order normally using deleteOrderById method", async () => {
        const result: OrderReturnType = await deleteOrderById(createdOrder.id);

        expect(result.id).toBeDefined();
    });
});
