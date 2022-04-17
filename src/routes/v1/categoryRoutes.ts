import express, { Express } from "express";

import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../controllers/category";

import { BASE_URL_V1, urlsV1 } from "../../constants/urls";

import { authToken } from "../../middlewares/auth";

export default function (serverApp: Express): void {
    const router = express.Router();

    router.get(urlsV1.category, getCategories);
    router.get(`${urlsV1.category}/:id`, getCategoryById);
    router.post(urlsV1.category, authToken, createCategory);
    router.put(urlsV1.category, authToken, updateCategory);
    router.delete(urlsV1.category, authToken, deleteCategory);

    // register routes v1
    serverApp.use(BASE_URL_V1, router);
}
