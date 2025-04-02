import { PAGINATED_QUIZ_PAGE } from "../../constants/paginated";
import { QuestionSchema } from "../../models/questionModel";
import {
  PaginatedApiResponse,
  PaginationOptions,
  QuizGetWithParams,
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

  async getQuestionsByFilter(
    params: QuizGetWithParams,
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  > {
    const { page = 1, limit = 10 } = paginationOptions;
    const skip = (page - 1) * limit;
    const { category, mode, difficulty } = params;

    // 1. Definición del filtro con tipos
    const filter: {
      'category.id'?: string | { $in: string[] };
      'question.type'?: string;
      'options.difficulty'?: string;
    } = {};

    // 2. Filtro para categorías (array de ICategory)
    if (category) {
      if (Array.isArray(category)) {
        // @ts-ignore
        filter['category._id'] = { $in: category }; // Búsqueda múltiple
      } else {
        // @ts-ignore
        filter['category._id'] = category; // Búsqueda simple
      }
    }

    // 3. Otros filtros
    if (mode) filter['question.type'] = mode;
    if (difficulty) filter['options.difficulty'] = difficulty;

    // 4. Consulta con proyección para evitar datos innecesarios
    const total = await QuestionSchema.countDocuments().exec();
    const data = await QuestionSchema.find(filter)
      .skip(skip)
      .limit(limit)
      .select({
        _id: 1,
        'category.id': 1,
        'category.category': 1,
        'category.icon': 1,
        'question.question': 1,
        'options.difficulty': 1
      })
      .lean<IQuiz[]>()
      .exec();

    return {
      limit,
      page,
      total,
      data
    };

  }
}
