import { PaginatedApiResponse, PaginationOptions, QuizGetWithParams } from '../../utils/apiResponse';
import { IQuiz } from '../../interfaces/IQuiz';
import { IQuizRepository } from '../interfaces/IQuizRepository';
import { QuizModel } from '../../models/quizModel';

export class QuizMongoRepository implements IQuizRepository {
  async createQuiz(quizData: Omit<IQuiz, '_id'>): Promise<IQuiz> {
    const newQuiz = new QuizModel(quizData);
    return await newQuiz.save();
  }
  createMultiQuiz(quizzes: IQuiz[]): Promise<IQuiz[]> {
    throw new Error('Method not implemented.');
  }
  findQuizById(id: string): Promise<IQuiz | null> {
    throw new Error('Method not implemented.');
  }
  updateQuizById(id: string, updates: Partial<IQuiz>): Promise<IQuiz | null> {
    throw new Error('Method not implemented.');
  }
  deleteQuizById(id: string): Promise<boolean | null> {
    throw new Error('Method not implemented.');
  }
  getQuizzesByCategory(paginationOptions: PaginationOptions, category: string): Promise<IQuiz[]> {
    throw new Error('Method not implemented.');
  }
  getQuizzesByFilter(params: QuizGetWithParams, paginationOptions: PaginationOptions): Promise<Omit<PaginatedApiResponse, 'res' | 'message' | 'success' | 'error'>> {
    throw new Error('Method not implemented.');
  }
  async getQuizzes(
    filters: Partial<{ category: string; difficulty: string; mode: string }>,
    pagination: PaginationOptions,
    random: boolean = false,
    excludeIds: string[] = []
  ): Promise<PaginatedApiResponse> {
    const matchStage: any = {};

    if (filters.category) {
      matchStage['category.category'] = filters.category;
    }

    if (filters.difficulty) {
      matchStage['options.difficulty'] = filters.difficulty;
    }

    if (filters.mode) {
      matchStage['question.type'] = filters.mode;
    }

    // Excluir preguntas ya respondidas
    if (excludeIds.length > 0) {
      matchStage['question.id'] = { $nin: excludeIds };
    }

    let pipeline = [];

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    if (random) {
      pipeline.push({ $sample: { size: pagination.limit } });
    } else {
      pipeline.push(
        { $skip: (pagination.page - 1) * pagination.limit },
        { $limit: pagination.limit }
      );
    }

    const quizzes = await QuizModel.aggregate(pipeline);
    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await QuizModel.aggregate(countPipeline);

    const total = countResult.length ? countResult[0].total : 0;

    return {
      data: quizzes,
      page: random ? 1 : pagination.page,
      limit: pagination.limit,
      total,
      message: 'Quizzes retrieved successfully',
      success: true,
      error: null,
    };
  }
}