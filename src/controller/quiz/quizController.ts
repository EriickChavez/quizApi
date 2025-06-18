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
import { QUESTION_DIFFICULTY, QUESTION_TYPES } from "../../enums/questions";
interface ICreateQuizRequest extends Request {
  body: {
    category: Array<{
      id: string;
      category: string;
      icon?: string;
    }>;
    question: {
      question: string;
      type: QUESTION_TYPES;
    };
    answers: Array<{
      id: string;
      answer: string;
      isCorrect: boolean;
      type: QUESTION_TYPES;
    }>;
    options: {
      difficulty: QUESTION_DIFFICULTY;
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
    // const { error } = CreateQuizSchema.validate(req.body);
    // if (error) {
    //   console.log('Error: ->', error);
    //   throw new ValidationError(error.details[0].message);
    // }
    const createdQuiz = await quizServiceInstance.createQuiz(quizData as unknown as IQuiz);
    sendResponse(res, 201, 'Quiz creado exitosamente', createdQuiz);
  } catch (error) {
    next(error);
  }
};

export const createMultiQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizData = req.body;
    const createdQuizzes = await quizServiceInstance.createMultiQuiz(quizData);
    sendResponse(res, 201, 'Quizes creados exitosamente', createdQuizzes);
  } catch (error) {
    console.log('Error: ->', error);
    next(error);
  }
};

export const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizId = req.params.id;
    const quizData = req.body;
    const updatedQuiz = await quizServiceInstance.updateQuiz(quizId, quizData);
    sendResponse(res, 200, 'Quiz actualizado exitosamente', updatedQuiz);
  } catch (error) {
    console.log('Error: ->', error);
    next(error);
  }
};

export const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizId = req.params.id;
    const deletedQuiz = await quizServiceInstance.deleteQuiz(quizId);
    sendResponse(res, 200, 'Quiz eliminado exitosamente', deletedQuiz);
  } catch (error) {
    console.log('Error: ->', error);
    next(error);
  }
}
