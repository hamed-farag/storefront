import express, { Express } from "express";

import {
    createOrderService,
    getOrderByIdService,
    deleteOrderByIdService,
    updateOrderStatusByIdService,
} from "../../controllers/order";

import { BASE_URL_V1, urlsV1 } from "../../constants/urls";

import { authToken } from "../../middlewares/auth";

export default function (serverApp: Express): void {
    const router = express.Router();

    router.post(urlsV1.order, authToken, createOrderService);
    router.get(`${urlsV1.order}/:id`, authToken, getOrderByIdService);
    router.delete(urlsV1.order, authToken, deleteOrderByIdService);
    router.put(urlsV1.order, authToken, updateOrderStatusByIdService);

    // register routes v1
    serverApp.use(BASE_URL_V1, router);
}
