import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../utils/apiResponse";
import { categoryServiceInstance } from "../../services/instances/categoryServiceInstance";

interface CreateCategoryRequest extends Request {
  body: {
    category: string;
    icon?: string;
    id?: string;
  };
}

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

export const createCategory = async (
  req: CreateCategoryRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = req.body;
    const createdCategory = await categoryServiceInstance.createCategory(categoryData);

    sendResponse(res, 201, 'Categoría creada exitosamente', createdCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: CreateCategoryRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const updatedCategory = await categoryServiceInstance.updateCategory(id, categoryData);

    if (!updatedCategory) {
      return sendResponse(res, 404, 'Categoría no encontrada');
    }

    sendResponse(res, 200, 'Categoría actualizada exitosamente', updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryServiceInstance.deleteCategory(id);

    if (!deletedCategory) {
      return sendResponse(res, 404, 'Categoría no encontrada');
    }

    sendResponse(res, 200, 'Categoría eliminada exitosamente', deletedCategory);
  } catch (error) {
    next(error);
  }
};