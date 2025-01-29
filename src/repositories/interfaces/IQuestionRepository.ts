import { Document } from "mongoose";
import {
  PaginatedApiResponse,
  PaginationOptions,
} from "../../utils/apiResponse";

export interface IQuestion {
  question: string;
  options: IOption[];
}

export interface IOption {
  option: string;
  isCorrect: boolean;
}

export interface IQuestionDocument extends IQuestion, Document {}

export interface IQuestionRepository {
  createQuestion(question: IQuestion): Promise<IQuestionDocument>;
  findQuestionById(id: string): Promise<IQuestionDocument | null>;
  updateQuestionById(
    id: string,
    updates: Partial<IQuestion>
  ): Promise<IQuestionDocument | null>;
  getQuestions(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  >;
  deleteQuestionById(id: string): Promise<boolean | null>;
}
