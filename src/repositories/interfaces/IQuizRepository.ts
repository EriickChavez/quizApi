import { IQuiz } from "../../interfaces/IQuiz";
import { PaginatedApiResponse, PaginationOptions, QuizGetWithParams } from "../../utils/apiResponse";

export interface IQuizRepository {
  createQuiz(quiz: IQuiz): Promise<IQuiz>;
  createMultiQuiz(quizes: IQuiz[]): Promise<IQuiz[]>;
  findQuizById(id: string): Promise<IQuiz | null>;
  updateQuizById(
    id: string,
    updates: Partial<IQuiz>
  ): Promise<IQuiz | null>;

  getQuizes(
    filters: Partial<{ category: string; difficulty: string; mode: string }>,
    pagination: PaginationOptions,
    random?: boolean,
    excludeIds?: string[]
  ): Promise<Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">>

  deleteQuizById(id: string): Promise<boolean | null>;
  getQuizesByCategory(
    paginationOptions: PaginationOptions,
    category: string
  ): Promise<IQuiz[]>;
  getQuizesByFilter(
    params: QuizGetWithParams,
    paginationOptions: PaginationOptions,
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">>;
}

