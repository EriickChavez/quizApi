import { QuestionSchema } from "../../models/questionModel";
import {
  PaginatedApiResponse,
  PaginationOptions,
} from "../../utils/apiResponse";
import {
  IQuestionRepository,
  IQuiz,
  IQuestionDocument,
} from "../interfaces/IQuestionRepository";

export class QuestionRepository implements IQuestionRepository {
  async createMultiQuestion(questions: IQuiz[]): Promise<IQuestionDocument[]> {
    try {
      const insertedQuestions = await QuestionSchema.insertMany(questions);
      return insertedQuestions as unknown as IQuestionDocument[];
    } catch (error: any) {
      throw new Error("Error saving multiple questions: " + error.message);
    }
  }
  async createQuestion(question: IQuiz): Promise<IQuestionDocument> {
    try {
      const newQuestion = new QuestionSchema(question);
      return await newQuestion.save();
    } catch (error: any) {
      throw new Error("Error saving question: " + error.message);
    }
  }

  async findQuestionById(id: string): Promise<IQuestionDocument | null> {
    return await QuestionSchema.findById(id).lean<IQuestionDocument>().exec();
  }

  async updateQuestionById(
    id: string,
    updates: Partial<IQuiz>
  ): Promise<IQuestionDocument | null> {
    return await QuestionSchema.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .lean<IQuestionDocument>()
      .exec();
  }

  async getQuestions(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  > {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;

    const total = await QuestionSchema.countDocuments().exec();
    const data = await QuestionSchema.find()
      .skip(skip)
      .limit(limit)
      .lean<IQuestionDocument>()
      .exec();

    return { data, total, page, limit };
  }

  async deleteQuestionById(id: string): Promise<boolean> {
    const deleted = await QuestionSchema.findByIdAndDelete(id);
    return !!deleted;
  }

  async getQuestionsByCategory(
    paginationOptions: PaginationOptions,
    category: string
  ): Promise<IQuestionDocument[]> {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;

    return await QuestionSchema.find({ category })
      .skip(skip)
      .limit(limit)
      .lean<IQuestionDocument[]>() // Cambia a IQuestionDocument[]
      .exec();
  }
}
