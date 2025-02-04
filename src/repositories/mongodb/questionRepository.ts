import { Question } from "../../models/questionModel";
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
  createQuestion(question: IQuiz): Promise<IQuestionDocument> {
    const newQuestion = new Question(question);
    return newQuestion.save((err, doc) => {
      if (err) {
        throw new Error("Error saving question");
      }
      return doc;
    });
  }
  findQuestionById(id: string): Promise<IQuestionDocument | null> {
    return Question.findById(id);
  }
  updateQuestionById(
    id: string,
    updates: Partial<IQuiz>
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
  getQuestionsByCategory(
    paginationOptions: PaginationOptions,
    category: string
  ): Promise<IQuestionDocument[]> {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;
    return Question.find({ category }).skip(skip).limit(limit).exec();
  }
}
