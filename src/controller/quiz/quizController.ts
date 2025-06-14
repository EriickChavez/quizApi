import { NextFunction, Request, Response } from "express";
import { quizServiceInstance } from "../../services/instances/quizServiceInstance";
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

import { answerHistoryServiceInstance } from "../../services/instances/answerHistoryServiceInstance";
import { IQuiz } from "../../interfaces/IQuiz";
import { CreateQuizSchema } from "../../validations/quiz.validation";
import { ValidationError } from "../../exceptions/ValidationError";
interface ICreateQuizRequest extends Request {
  body: {
    category: Array<{
      id: string;
      category: string;
      icon?: string;
    }>;
    question: {
      text: string;
      type: 'text' | 'image';
    };
    answers: Array<{
      id: string;
      answer: string;
      isCorrect: boolean;
      type: 'text' | 'image';
    }>;
    options: {
      difficulty: 'easy' | 'medium' | 'hard';
    };
  };
}


export const getQuizes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      category,
      difficulty,
      mode,
      random,
      userId,
      excludeAnswered
    } = req.query as Record<string, string>;

    let excludeIds: string[] = [];

    if (userId && excludeAnswered === 'true') {
      const history = await answerHistoryServiceInstance.getAnswerHistoryByUser(userId);
      excludeIds = history.map(h => h.questionId);
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const isRandom = random === 'true';

    const result = await quizServiceInstance.getQuizes(
      { category, difficulty, mode },
      { page, limit },
      isRandom,
      excludeIds
    );

    return sendPaginatedResponse(
      res,
      200,
      'Quizes obtenidos correctamente',
      result.data,
      result.page,
      result.limit,
      result.total
    );
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (
  req: ICreateQuizRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizData = req.body;
    const { error } = CreateQuizSchema.validate(req.body);
    if (error) {
      console.log('Error: ->', error);
      throw new ValidationError(error.details[0].message);
    }
    const createdQuiz = await quizServiceInstance.createQuiz(quizData as unknown as IQuiz);
    console.log({ createdQuiz });
    sendResponse(res, 201, 'Quiz creado exitosamente', createdQuiz);
  } catch (error) {
    console.log('SOY EL DE ERROR ->', error);
    next(error);
  }
};

// export const createQuestion = async (req: Request, res: Response) => {
//   try {
//     const question = await quizServiceInstance.createQuestion(req.body);
//     sendResponse(res, 201, "Question created successfully", question);
//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_001",
//       details: error.message,
//     });
//   }
// };
// export const createMultiQuestion = async (req: Request, res: Response) => {
//   try {
//     const questions = await quizServiceInstance.createMultiQuestion(
//       req.body
//     );
//     sendResponse(res, 201, "Questions created successfully", questions);
//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_001",
//       details: error.message,
//     });
//   }
// };

// export const getQuestions = async (req: Request, res: Response) => {
//   try {
//     const paginationOptions: PaginationOptions = {
//       page:
//         typeof req.query.page === "string"
//           ? parseInt(req.query.page)
//           : PAGINATED_QUIZ_PAGE,
//       limit:
//         typeof req.query.limit === "string"
//           ? parseInt(req.query.limit)
//           : PAGINATED_QUIZ_LIMIT,
//     };
//     const { limit, page, total, data } =
//       await quizServiceInstance.getQuestions(paginationOptions);
//     sendPaginatedResponse(
//       res,
//       200,
//       "Questions retrieved successfully",
//       data,
//       page,
//       limit,
//       total
//     );
//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_002",
//       details: error.message,
//     });
//   }
// };

// export const getQuestionById = async (req: Request, res: Response) => {
//   try {
//     const question = await quizServiceInstance.getQuestionById(
//       req.params.id
//     );
//     sendResponse(res, 200, "Question retrieved successfully", question);
//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_003",
//       details: error.message,
//     });
//   }
// };

// export const updateQuestion = async (req: Request, res: Response) => {
//   try {
//     const question = await quizServiceInstance.updateQuestion(
//       req.params.id,
//       req.body
//     );
//     sendResponse(res, 200, "Question updated successfully", question);
//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_004",
//       details: error.message,
//     });
//   }
// };

// export const deleteQuestion = async (req: Request, res: Response) => {
//   try {
//     const question = await quizServiceInstance.deleteQuestion(
//       req.params.id
//     );
//     sendResponse(res, 200, "Question deleted successfully", question);
//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_005",
//       details: error.message,
//     });
//   }
// };

// export const getQuestionsByCategory = async (req: Request, res: Response) => {
//   try {
//     const paginationOptions: PaginationOptions = {
//       page:
//         typeof req.query.page === "string"
//           ? parseInt(req.query.page)
//           : PAGINATED_QUIZ_PAGE,
//       limit:
//         typeof req.query.limit === "string"
//           ? parseInt(req.query.limit)
//           : PAGINATED_QUIZ_LIMIT,
//     };
//     console.log(req.params);
//     const questions = await quizServiceInstance.getQuestionsByCategory(
//       paginationOptions,
//       req.params.id
//     );
//     sendResponse(res, 200, "Questions retrieved successfully", questions);
//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_006",
//       details: error.message,
//     });
//   }
// };

// export const getQuestionsByFilter = async (req: Request, res: Response) => {
//   try {
//     const { category, mode, difficulty } = req.query
//     const paginationOptions: PaginationOptions = {
//       page:
//         typeof req.query.page === "string"
//           ? parseInt(req.query.page)
//           : PAGINATED_QUIZ_PAGE,
//       limit:
//         typeof req.query.limit === "string"
//           ? parseInt(req.query.limit)
//           : PAGINATED_QUIZ_LIMIT,
//     };
//     const params: QuizGetWithParams = {}

//     if (category) params.category = category as string
//     if (mode) params.mode = mode as string
//     if (difficulty) params.difficulty = difficulty as string

//     console.log({ query: req.query })

//     const { limit, page, total, data } =
//       await quizServiceInstance.getQuestionsByFilter(params, paginationOptions);

//     sendPaginatedResponse(
//       res,
//       200,
//       "Questions retrieved successfully",
//       data,
//       page,
//       limit,
//       total
//     );

//   } catch (error: any) {
//     sendResponse(res, 400, error.message, null, {
//       code: "AUTH_002",
//       details: error.message,
//     });
//   }
// }