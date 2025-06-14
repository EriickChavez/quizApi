import { PaginationOptions } from '../../utils/apiResponse';
import { IQuizRepository } from '../../repositories/interfaces/IQuizRepository';
import { IQuiz } from '../../interfaces/IQuiz';

export class QuizService {
  constructor(private quizRepository: IQuizRepository) { }

  async getQuizes(
    filters: Partial<{ category: string; difficulty: string; mode: string }>,
    pagination: PaginationOptions,
    random: boolean = false,
    excludeIds: string[] = []
  ) {
    return this.quizRepository.getQuizes(filters, pagination, random, excludeIds);
  }

  async createQuiz(quizData: Omit<IQuiz, '_id'>): Promise<IQuiz> {
    return this.quizRepository.createQuiz(quizData);
  }
}