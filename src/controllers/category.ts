import { Request, Response } from "express";

import { createNewCategory, getCategoryBy } from "../models/category";

import { CategoryCreatedReturnType } from "../interfaces/Category";

import stringer from "../utils/string";

import errors from "../constants/errors";

export async function getCategories(req: Request, res: Response) {}

export async function getCategoryById(req: Request, res: Response) {
    try {
        const { id: categoryId } = req.params as unknown as { id: string };

        if (stringer.isEmptyOrNull(categoryId)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const category: CategoryCreatedReturnType = await getCategoryBy("id", categoryId);
        if (category) {
            return res.status(200).json(category);
        }

        return res.status(404).json({ ...errors.CATEGORY_NOT_FOUND });
    } catch (error) {
        return res.status(500).json({ ...errors.CATEGORY_CREATE_ERROR });
    }
}

export async function createCategory(req: Request, res: Response) {
    try {
        const { name } = req.body;

        if (stringer.isEmptyOrNull(name)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const category: CategoryCreatedReturnType = await getCategoryBy("name", name);
        if (category) {
            return res.status(409).json({ ...errors.CATEGORY_ALREADY_EXIST });
        }

        const newCategory: CategoryCreatedReturnType = await createNewCategory(name);
        return res.status(200).json(newCategory);
    } catch (error) {
        return res.status(500).json({ ...errors.CATEGORY_CREATE_ERROR });
    }
}

export async function updateCategory(req: Request, res: Response) {}

export async function deleteCategory(req: Request, res: Response) {}
