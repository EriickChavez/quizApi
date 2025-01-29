import { Question } from "../../models/questionModel";
import {
  PaginatedApiResponse,
  PaginationOptions,
} from "../../utils/apiResponse";
import {
  IQuestionRepository,
  IQuestion,
  IQuestionDocument,
} from "../interfaces/IQuestionRepository";

export class QuestionRepository implements IQuestionRepository {
  createQuestion(question: IQuestion): Promise<IQuestionDocument> {
    const newQuestion = new Question(question);
    return newQuestion.save();
  }
  findQuestionById(id: string): Promise<IQuestionDocument | null> {
    return Question.findById(id);
  }
  updateQuestionById(
    id: string,
    updates: Partial<IQuestion>
  ): Promise<IQuestionDocument | null> {
    return Question.findByIdAndUpdate(id, updates, { new: true });
  }
  async getQuestions(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  > {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;
    const total = await Question.countDocuments().exec();
    const data = await Question.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }
  deleteQuestionById(id: string): Promise<boolean | null> {
    return Question.findByIdAndDelete(id);
  }
}
