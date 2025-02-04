import { Request, Response } from "express";
import {
  PaginationOptions,
  sendPaginatedResponse,
  sendResponse,
} from "../../utils/apiResponse";
import {
  PAGINATED_QUIZ_LIMIT,
  PAGINATED_QUIZ_PAGE,
} from "../../constants/paginated";
import { categoryServiceInstance } from "../../services/instances/categoryServiceInstance";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryServiceInstance.createCategory(req.body);
    sendResponse(res, 201, "Category created successfully", category);
  } catch (error: any) {
    sendResponse(res, 500, error.message, null, {
      code: "AUTH_001",
      details: error.message,
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const paginationOptions: PaginationOptions = {
      page:
        typeof req.query.page === "string"
          ? parseInt(req.query.page)
          : PAGINATED_QUIZ_PAGE,
      limit:
        typeof req.query.limit === "string"
          ? parseInt(req.query.limit)
          : PAGINATED_QUIZ_LIMIT,
    };
    const { limit, page, total, data } =
      await categoryServiceInstance.getCategories(paginationOptions);
    sendPaginatedResponse(
      res,
      200,
      "Categories retrieved successfully",
      data,
      page,
      limit,
      total
    );
  } catch (error: any) {
    sendResponse(res, 500, error.message, null, {
      code: "AUTH_002",
      details: error.message,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryServiceInstance.updateCategory(
      req.body.categoryId,
      req.body
    );
    sendResponse(res, 200, "Category updated successfully", category);
  } catch (error: any) {
    sendResponse(res, 500, error.message, null, {
      code: "AUTH_003",
      details: error.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryServiceInstance.deleteCategory(
      req.params.id
    );
    sendResponse(res, 200, "Category deleted successfully", category);
  } catch (error: any) {
    sendResponse(res, 500, error.message, null, {
      code: "AUTH_004",
      details: error.message,
    });
  }
};
