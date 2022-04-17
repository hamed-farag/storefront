import { Request, Response } from "express";

export async function getCategories(req: Request, res: Response) {
    res.json({ name: "hamed" });
}
export async function getCategoryById(req: Request, res: Response) {}
export async function createCategory(req: Request, res: Response) {}
export async function updateCategory(req: Request, res: Response) {}
export async function deleteCategory(req: Request, res: Response) {}
