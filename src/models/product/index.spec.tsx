import dotenv from "dotenv";
import path from "path";

import { createProduct, deleteProductById, getProductBy, getProducts, updateProduct } from "./";
import { createCategory } from "../category";

import { ProductReturnType, ProductFullInterface } from "../../interfaces/Product";
import { CategoryCreatedReturnType } from "../../interfaces/Category";

//  to resolve "Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
dotenv.config({
    path: `${path.join(__dirname, `../../../../.env.development`)}`,
});

describe("Product Model", () => {
    let product: ProductFullInterface = {
        id: "",
        name: "Product 1",
        price: 999,
        categoryId: 0,
    };

    beforeAll(async function () {
        const result: CategoryCreatedReturnType = await createCategory("New Category");

        product.categoryId = result.id;
    });

    it("should have a createProduct method", () => {
        expect(createProduct).toBeDefined();
    });

    it("should have a getProducts method", () => {
        expect(getProducts).toBeDefined();
    });

    it("should have a getProductBy method", () => {
        expect(getProductBy).toBeDefined();
    });

    it("should have a deleteProductById method", () => {
        expect(deleteProductById).toBeDefined();
    });

    it("should have a updateProduct method", () => {
        expect(updateProduct).toBeDefined();
    });

    it("should create a product normally using createProduct method", async () => {
        const result: ProductReturnType = await createProduct(product);

        product = result;

        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.name).toEqual(product.name);
    });

    it("should get a product by id normally using getProductBy method", async () => {
        const result: ProductReturnType = await getProductBy("id", product.id);

        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.id).toEqual(product.id);
    });

    it("should update a product by id normally using updateProduct method", async () => {
        const newPrice = 1100;

        const result: ProductReturnType = await updateProduct({ ...product, price: newPrice });
        product = result;

        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(Number(result.price)).toEqual(newPrice);
    });

    it("should get all products using getProducts method", async () => {
        const result: ProductReturnType[] = await getProducts();

        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result).toContain(product);
    });

    it("should delete product by id using deleteProductById method", async () => {
        const result: ProductReturnType = await deleteProductById(product.id);

        expect(result.id).toBeDefined();
        expect(result.id).toEqual(product.id);
    });
});
