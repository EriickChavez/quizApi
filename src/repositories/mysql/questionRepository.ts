import mysql from "mysql2/promise";
import {
  IQuiz,
  IQuestionDocument,
  IQuestionRepository,
} from "../interfaces/IQuestionRepository";
import {
  PaginationOptions,
  PaginatedApiResponse,
} from "../../utils/apiResponse";

export class MysqlQuestionRepository implements IQuestionRepository {
  private connection: mysql.Connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }
  createMultiQuestion(questions: IQuiz[]): Promise<IQuestionDocument[]> {
    throw new Error("Method not implemented.");
  }

  async createQuestion(question: IQuiz): Promise<any> {
    const [result] = await this.connection.query("", []);
    return result;
  }

  async findQuestionById(id: string): Promise<any> {
    const [result] = await this.connection.query("", []);
    return result;
  }
  async updateQuestionById(id: string, updates: Partial<IQuiz>): Promise<any> {
    const [result] = await this.connection.query("", []);
    return result;
  }
  async getQuestions(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  > {
    const [result] = await this.connection.query("", []);
    return {
      data: result,
      // @ts-ignore
      total: result.length,
      page: paginationOptions.page,
      limit: paginationOptions.limit,
    };
  }
  async deleteQuestionById(id: string): Promise<boolean> {
    const [result] = await this.connection.query("", []);
    return true;
  }
  async getQuestionsByCategory(
    paginationOptions: PaginationOptions,
    category: string
  ): Promise<IQuestionDocument[]> {
    const [result] = await this.connection.query("", []);
    return result as IQuestionDocument[];
  }
}
