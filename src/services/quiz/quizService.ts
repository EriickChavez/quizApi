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

  async createQuiz(quizData: IQuiz): Promise<IQuiz> {
    return this.quizRepository.createQuiz(quizData);
  }
  async createMultiQuiz(quizData: IQuiz[]): Promise<IQuiz[]> {
    return this.quizRepository.createMultiQuiz(quizData);
  }
  async updateQuiz(id: string, quizData: Partial<IQuiz>): Promise<IQuiz | null> {
    return this.quizRepository.updateQuiz(id, quizData);
  }

  async deleteQuiz(id: string): Promise<boolean | null> {
    return this.quizRepository.deleteQuiz(id);
  }
}