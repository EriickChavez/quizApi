import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../utils/apiResponse";
import { categoryServiceInstance } from "../../services/instances/categoryServiceInstance";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryServiceInstance.getAllCategories();
    sendResponse(res, 200, 'Categorías obtenidas correctamente', categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await categoryServiceInstance.getCategoryById(id);

    if (!category) {
      return sendResponse(res, 404, 'Categoría no encontrada');
    }

    sendResponse(res, 200, 'Categoría obtenida correctamente', category);
  } catch (error) {
    next(error);
  }
};