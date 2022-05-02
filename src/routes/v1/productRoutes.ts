import express, { Express } from "express";

import {
    createProductService,
    deleteProductService,
    getProductByIdService,
    getProductsService,
    updateProductService,
} from "../../controllers/product";

import { BASE_URL_V1, urlsV1 } from "../../constants/urls";

import { authToken } from "../../middlewares/auth";

export default function (serverApp: Express): void {
    const router = express.Router();

    router.get(urlsV1.product, authToken, getProductsService);
    router.get(`${urlsV1.product}/:id`, authToken, getProductByIdService);
    router.post(urlsV1.product, authToken, createProductService);
    router.put(urlsV1.product, authToken, updateProductService);
    router.delete(urlsV1.product, authToken, deleteProductService);

    // register routes v1
    serverApp.use(BASE_URL_V1, router);
}
