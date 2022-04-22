import { Request, Response } from "express";

import {
    createProduct,
    deleteProductById,
    getProductBy,
    getProducts,
    updateProduct,
} from "../models/product";

import { ProductReturnType } from "../interfaces/Product";

import stringer from "../utils/string";

import errors from "../constants/errors";

export async function getProductsService(req: Request, res: Response) {
    try {
        const products: ProductReturnType[] = await getProducts();

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ ...errors.PRODUCTS_GET_ERROR });
    }
}

export async function getProductByIdService(req: Request, res: Response) {
    try {
        const { id: productId } = req.params as unknown as { id: string };

        if (stringer.isEmptyOrNull(productId)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const product: ProductReturnType = await getProductBy("id", productId);
        if (product) {
            return res.status(200).json(product);
        }

        return res.status(404).json({ ...errors.PRODUCT_NOT_FOUND });
    } catch (error) {
        return res.status(500).json({ ...errors.PRODUCT_GET_ERROR });
    }
}

export async function createProductService(req: Request, res: Response) {
    try {
        const { name, price, categoryId } = req.body;

        if (stringer.isEmptyOrNull(name)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const product: ProductReturnType = await getProductBy("name", name);
        if (product) {
            return res.status(409).json({ ...errors.PRODUCT_ALREADY_EXIST });
        }

        const newProduct: ProductReturnType = await createProduct({ name, price, categoryId });
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json({ ...errors.PRODUCT_CREATE_ERROR });
    }
}

export async function updateProductService(req: Request, res: Response) {
    try {
        const { id, name, price, categoryId } = req.body;

        if (stringer.isEmptyOrNull(id) || stringer.isEmptyOrNull(name)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const updatedProduct: ProductReturnType = await updateProduct({
            id,
            name,
            price,
            categoryId,
        });
        const jsonToSend = updatedProduct !== undefined ? updatedProduct : errors.PRODUCT_NOT_FOUND;

        return res.status(200).json(jsonToSend);
    } catch (error) {
        return res.status(500).json({ ...errors.PRODUCT_UPDATE_ERROR });
    }
}

export async function deleteProductService(req: Request, res: Response) {
    try {
        const { id } = req.body;

        if (stringer.isEmptyOrNull(id)) {
            return res.status(500).send({ ...errors.MISSING_PARAMS });
        }

        const deletedProduct: ProductReturnType = await deleteProductById(id);
        const jsonToSend = deletedProduct !== undefined ? deletedProduct : errors.PRODUCT_NOT_FOUND;

        return res.status(200).json(jsonToSend);
    } catch (error) {
        return res.status(500).json({ ...errors.PRODUCT_DELETE_ERROR });
    }
}
