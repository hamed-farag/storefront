import { Request, Response } from "express";

import { createOrder, getOrderById, deleteOrderById, updateOrderStatusById } from "../models/order";

import { Order, OrderProduct } from "../interfaces/Order";
import UUID from "../types/UUID";

import stringer from "../utils/string";

import errors from "../constants/errors";

export async function createOrderService(req: Request, res: Response) {
    try {
        const { products } = req.body as unknown as { products: OrderProduct[] };

        if (products === undefined || products.length === 0) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const orderResult: Order = await createOrder({
            status: "active",
            userId: res.locals.userData.id,
            products: products,
        });

        return res.status(200).json(orderResult);
    } catch (error) {
        return res.status(500).json({ ...errors.ORDER_CREATE_ERROR });
    }
}

export async function getOrderByIdService(req: Request, res: Response) {
    try {
        const { id: orderId } = req.params as unknown as { id: UUID };

        if (stringer.isEmptyOrNull(orderId.toString())) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }
        const orderResult: Order = await getOrderById(orderId);

        return res.status(200).json(orderResult);
    } catch (error) {
        return res.status(500).json({ ...errors.ORDER_GET_ERROR });
    }
}

export async function deleteOrderByIdService(req: Request, res: Response) {
    try {
        const { id } = req.body;
        if (stringer.isEmptyOrNull(id)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }
        const orderResult: Order = await deleteOrderById(id);

        return res.status(200).json(orderResult);
    } catch (error) {
        return res.status(500).json({ ...errors.ORDER_DELETE_ERROR });
    }
}

export async function updateOrderStatusByIdService(req: Request, res: Response) {
    try {
        const { id, status } = req.body;
        if (stringer.isEmptyOrNull(id) || stringer.isEmptyOrNull(status)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }
        const orderResult: Order = await updateOrderStatusById(id, status);

        return res.status(200).json(orderResult);
    } catch (error) {
        return res.status(500).json({ ...errors.ORDER_UPDATE_STATUS_ERROR });
    }
}
