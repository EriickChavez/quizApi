import { PaginatedApiResponse, PaginationOptions, QuizGetWithParams } from '../../utils/apiResponse';
import { IQuiz } from '../../interfaces/IQuiz';
import { IQuizRepository } from '../interfaces/IQuizRepository';
import { QuizModel } from '../../models/quizModel';
import { v4 as uuid } from 'uuid';

export class QuizMongoRepository implements IQuizRepository {
  async createQuiz(quizData: IQuiz): Promise<IQuiz> {
    const quizToSave: IQuiz = {
      id: quizData.id || `${uuid()}`,
      answers: quizData.answers,
      category: quizData.category,
      createdAt: new Date(),
      options: quizData.options,
      question: quizData.question
    };

    const quizDoc = new QuizModel(quizToSave);
    await quizDoc.save();

    return quizToSave;
  }

  async getQuizes(
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

    const quizes = await QuizModel.aggregate(pipeline);
    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await QuizModel.aggregate(countPipeline);

    const total = countResult.length ? countResult[0].total : 0;

    return {
      data: quizes,
      page: random ? 1 : pagination.page,
      limit: pagination.limit,
      total,
      message: 'Quizes retrieved successfully',
      success: true,
      error: null,
    };
  }

  async updateQuiz(id: string, quizData: Partial<IQuiz>): Promise<IQuiz | null> {
    const updatedQuiz = await QuizModel.findOneAndUpdate(
      { id },
      { ...quizData },
      { new: true }
    );

    return updatedQuiz;
  }

  async deleteQuiz(id: string): Promise<boolean | null> {
    const deletedItem = await QuizModel.deleteOne({ id });
    return deletedItem.deletedCount > 0;
  }
}