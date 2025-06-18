import { IQuiz } from "../../interfaces/IQuiz";
import { PaginatedApiResponse, PaginationOptions, QuizGetWithParams } from "../../utils/apiResponse";

export interface IQuizRepository {
  createQuiz(quiz: IQuiz): Promise<IQuiz>;
  updateQuiz(
    id: string,
    updates: Partial<IQuiz>
  ): Promise<IQuiz | null>;

  getQuizes(
    filters: Partial<{ category: string; difficulty: string; mode: string }>,
    pagination: PaginationOptions,
    random?: boolean,
    excludeIds?: string[]
  ): Promise<Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">>

  deleteQuiz(id: string): Promise<boolean | null>;
}

