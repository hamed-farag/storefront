import dotenv from "dotenv";
import path from "path";

import {
    createCategory,
    getCategories,
    getCategoryBy,
    deleteCategoryById,
    updateCategory,
} from "./";

import { CategoryCreatedReturnType, CategoryInterface } from "../../interfaces/Category";

//  to resolve "Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
dotenv.config({
    path: `${path.join(__dirname, `../../../../.env.test`)}`,
});

describe("Category Model", () => {
    let category: CategoryInterface = {
        id: 1,
        name: "Category 1",
    };

    it("should have a createCategory method", () => {
        expect(createCategory).toBeDefined();
    });

    it("should have a getCategories method", () => {
        expect(getCategories).toBeDefined();
    });

    it("should have a getCategoryBy method", () => {
        expect(getCategoryBy).toBeDefined();
    });

    it("should have a deleteCategoryById method", () => {
        expect(deleteCategoryById).toBeDefined();
    });

    it("should have a updateCategory method", () => {
        expect(updateCategory).toBeDefined();
    });

    it("should create a category normally using createCategory method", async () => {
        const result: CategoryCreatedReturnType = await createCategory(category.name);

        category = result;

        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.name).toEqual(category.name);
    });

    it("should get a category by id normally using getCategoryBy method", async () => {
        const result: CategoryCreatedReturnType = await getCategoryBy("id", category.id);

        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.id).toEqual(category.id);
    });

    it("should get a category by name normally using getCategoryBy method", async () => {
        const result: CategoryCreatedReturnType = await getCategoryBy("name", category.name);

        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.name).toEqual(category.name);
    });

    it("should update a category by id normally using updateCategory method", async () => {
        const result: CategoryCreatedReturnType = await updateCategory({
            id: category.id,
            name: "Category 2",
        });

        category = result;

        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.name).toEqual(category.name);
    });

    it("should get all categories using getCategories method", async () => {
        const result: CategoryCreatedReturnType[] = await getCategories();

        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result).toContain(category);
    });

    it("should delete category by id using deleteCategoryById method", async () => {
        const result: CategoryCreatedReturnType = await deleteCategoryById(category.id);

        expect(result.id).toBeDefined();
        expect(result.id).toEqual(category.id);
    });
});
