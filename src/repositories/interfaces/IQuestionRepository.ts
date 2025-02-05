import { Document } from "mongoose";
import {
  PaginatedApiResponse,
  PaginationOptions,
} from "../../utils/apiResponse";
import { QUESTION_TYPES, QUESTION_DIFFICULTY } from "../../enums/questions";
import { ICategory } from "./ICategoryRepository";

export interface IQuiz {
  id: string;
  category: ICategory[];
  question: IQuestion;
  answers: IAnswer[];
  options: IOptions;
}
export interface IQuestion {
  question: string;
  type: QUESTION_TYPES;
}

export interface IAnswer {
  answer: string;
  isCorrect: boolean;
  type: QUESTION_TYPES;
}

export interface IOptions {
  dificulty: QUESTION_DIFFICULTY;
  type: QUESTION_TYPES;
}

// @ts-ignore
export interface IQuestionDocument extends IQuiz, Document {}

export interface IQuestionRepository {
  createQuestion(question: IQuiz): Promise<IQuestionDocument>;
  createMultiQuestion(questions: IQuiz[]): Promise<IQuestionDocument[]>;
  findQuestionById(id: string): Promise<IQuestionDocument | null>;
  updateQuestionById(
    id: string,
    updates: Partial<IQuiz>
  ): Promise<IQuestionDocument | null>;
  getQuestions(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  >;
  deleteQuestionById(id: string): Promise<boolean | null>;
  getQuestionsByCategory(
    paginationOptions: PaginationOptions,
    category: string
  ): Promise<IQuestionDocument[]>;
}
