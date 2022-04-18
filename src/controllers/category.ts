import { Request, Response } from "express";

import {
    createCategory,
    getCategoryBy,
    updateCategory,
    deleteCategoryById,
    getCategories,
} from "../models/category";

import { CategoryCreatedReturnType } from "../interfaces/Category";

import stringer from "../utils/string";

import errors from "../constants/errors";

export async function getCategoriesService(req: Request, res: Response) {
    try {
        const categories: CategoryCreatedReturnType[] = await getCategories();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ ...errors.CATEGORIES_GET_ERROR });
    }
}

export async function getCategoryByIdService(req: Request, res: Response) {
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
        return res.status(500).json({ ...errors.CATEGORY_GET_ERROR });
    }
}

export async function createCategoryService(req: Request, res: Response) {
    try {
        const { name } = req.body;

        if (stringer.isEmptyOrNull(name)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const category: CategoryCreatedReturnType = await getCategoryBy("name", name);
        if (category) {
            return res.status(409).json({ ...errors.CATEGORY_ALREADY_EXIST });
        }

        const newCategory: CategoryCreatedReturnType = await createCategory(name);
        return res.status(200).json(newCategory);
    } catch (error) {
        return res.status(500).json({ ...errors.CATEGORY_CREATE_ERROR });
    }
}

export async function updateCategoryService(req: Request, res: Response) {
    try {
        const { id, name } = req.body;

        if (stringer.isEmptyOrNull(id) || stringer.isEmptyOrNull(name)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const category: CategoryCreatedReturnType = await getCategoryBy("id", id);
        if (!category) {
            return res.status(409).json({ ...errors.CATEGORY_NOT_FOUND });
        }

        const updatedCategory: CategoryCreatedReturnType = await updateCategory({ id, name });
        return res.status(200).json(updatedCategory);
    } catch (error) {
        return res.status(500).json({ ...errors.CATEGORY_UPDATE_ERROR });
    }
}

export async function deleteCategoryService(req: Request, res: Response) {
    try {
        const { id } = req.body;

        if (stringer.isEmptyOrNull(id)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const category: CategoryCreatedReturnType = await getCategoryBy("id", id);
        if (!category) {
            return res.status(409).json({ ...errors.CATEGORY_NOT_FOUND });
        }

        const deletedCategory: CategoryCreatedReturnType = await deleteCategoryById(id);
        return res.status(200).json(deletedCategory);
    } catch (error) {
        return res.status(500).json({ ...errors.CATEGORY_DELETE_ERROR });
    }
}
