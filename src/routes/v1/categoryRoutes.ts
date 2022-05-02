import express, { Express } from "express";

import {
    getCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
} from "../../controllers/category";

import { BASE_URL_V1, urlsV1 } from "../../constants/urls";

import { authToken } from "../../middlewares/auth";

export default function (serverApp: Express): void {
    const router = express.Router();

    router.get(urlsV1.category, authToken, getCategoriesService);
    router.get(`${urlsV1.category}/:id`, authToken, getCategoryByIdService);
    router.post(urlsV1.category, authToken, createCategoryService);
    router.put(urlsV1.category, authToken, updateCategoryService);
    router.delete(urlsV1.category, authToken, deleteCategoryService);

    // register routes v1
    serverApp.use(BASE_URL_V1, router);
}
