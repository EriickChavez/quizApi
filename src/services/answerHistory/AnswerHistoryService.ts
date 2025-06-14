import { IAnswerHistory } from '../../interfaces/IAnswerHistory';
import { IAnswerHistoryRepository } from '../../repositories/interfaces/IAnswerHistoryRepository';

export class AnswerHistoryService {
    constructor(private answerHistoryRepository: IAnswerHistoryRepository) { }

    async saveAnswerHistory(history: Omit<IAnswerHistory, '_id'>): Promise<IAnswerHistory> {
        return this.answerHistoryRepository.createAnswerHistory(history);
    }

    async getAnswerHistoryByUser(userId: string): Promise<IAnswerHistory[]> {
        return this.answerHistoryRepository.getAnswerHistoryByUser(userId);
    }
}
