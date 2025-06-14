import { PaginationOptions } from '../../utils/apiResponse';
import { IQuizRepository } from '../../repositories/interfaces/IQuizRepository';

export class QuizService {
  constructor(private quizRepository: IQuizRepository) { }

  async getQuizzes(
    filters: Partial<{ category: string; difficulty: string; mode: string }>,
    pagination: PaginationOptions,
    random: boolean = false,
    excludeIds: string[] = []
  ) {
    return this.quizRepository.getQuizzes(filters, pagination, random, excludeIds);
  }
}