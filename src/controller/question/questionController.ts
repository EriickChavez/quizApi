import { Request, Response } from "express";
import { questionServiceInstance } from "../../services/instances/questionServiceInstance";
import {
  PaginationOptions,
  QuizGetWithParams,
  sendPaginatedResponse,
  sendResponse,
} from "../../utils/apiResponse";
import {
  PAGINATED_QUIZ_LIMIT,
  PAGINATED_QUIZ_PAGE,
} from "../../constants/paginated";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await questionServiceInstance.createQuestion(req.body);
    sendResponse(res, 201, "Question created successfully", question);
  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_001",
      details: error.message,
    });
  }
};
export const createMultiQuestion = async (req: Request, res: Response) => {
  try {
    const questions = await questionServiceInstance.createMultiQuestion(
      req.body
    );
    sendResponse(res, 201, "Questions created successfully", questions);
  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_001",
      details: error.message,
    });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
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
      await questionServiceInstance.getQuestions(paginationOptions);
    sendPaginatedResponse(
      res,
      200,
      "Questions retrieved successfully",
      data,
      page,
      limit,
      total
    );
  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_002",
      details: error.message,
    });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await questionServiceInstance.getQuestionById(
      req.params.id
    );
    sendResponse(res, 200, "Question retrieved successfully", question);
  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_003",
      details: error.message,
    });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await questionServiceInstance.updateQuestion(
      req.params.id,
      req.body
    );
    sendResponse(res, 200, "Question updated successfully", question);
  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_004",
      details: error.message,
    });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await questionServiceInstance.deleteQuestion(
      req.params.id
    );
    sendResponse(res, 200, "Question deleted successfully", question);
  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_005",
      details: error.message,
    });
  }
};

export const getQuestionsByCategory = async (req: Request, res: Response) => {
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
    console.log(req.params);
    const questions = await questionServiceInstance.getQuestionsByCategory(
      paginationOptions,
      req.params.id
    );
    sendResponse(res, 200, "Questions retrieved successfully", questions);
  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_006",
      details: error.message,
    });
  }
};

export const getQuestionsByFilter = async (req: Request, res: Response) => {
  try {
    const { category, mode, difficulty } = req.query
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
    const params: QuizGetWithParams = {}

    if (category) params.category = category as string
    if (mode) params.mode = mode as string
    if (difficulty) params.difficulty = difficulty as string

    console.log({ query: req.query })

    const { limit, page, total, data } =
      await questionServiceInstance.getQuestionsByFilter(params, paginationOptions);

    sendPaginatedResponse(
      res,
      200,
      "Questions retrieved successfully",
      data,
      page,
      limit,
      total
    );

  } catch (error: any) {
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_002",
      details: error.message,
    });
  }
}