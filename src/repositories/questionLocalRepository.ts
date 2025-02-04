import { PaginationOptions, PaginatedApiResponse } from "../utils/apiResponse";
import {
  IQuiz,
  IQuestionDocument,
  IQuestionRepository,
} from "./interfaces/IQuestionRepository";

export class LocalQuestionRepository implements IQuestionRepository {
  private questions: IQuiz[] = [];
  private categories: string[] = [];

  createQuestion(question: IQuiz): Promise<IQuestionDocument> {
    this.questions.push(question);
    return Promise.resolve(question as IQuestionDocument);
  }
  findQuestionById(id: string): Promise<IQuestionDocument | null> {
    const question = this.questions.find((q) => q.id === id) || null;
    return Promise.resolve(question as IQuestionDocument | null);
  }
  updateQuestionById(
    id: string,
    updates: Partial<IQuiz>
  ): Promise<IQuestionDocument | null> {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.questions[index] = { ...this.questions[index], ...updates };
    return Promise.resolve(this.questions[index] as IQuestionDocument);
  }
  getQuestions(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  > {
    const { page, limit } = paginationOptions;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedQuestions = this.questions.slice(start, end);
    return Promise.resolve({
      data: paginatedQuestions,
      total: this.questions.length,
      page,
      limit,
    });
  }
  deleteQuestionById(id: string): Promise<boolean | null> {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.questions.splice(index, 1);
    return Promise.resolve(true);
  }
  getQuestionsByCategory(
    paginationOptions: PaginationOptions,
    category: string
  ): Promise<IQuestionDocument[]> {
    const { page, limit } = paginationOptions;
    const start = (page - 1) * limit;
    const end = start + limit;

    return Promise.resolve([] as IQuestionDocument[]);
  }
}
