import { AnswerHistoryModel } from '../../models/AnswerHistoryModel';
import { IAnswerHistory } from '../../interfaces/IAnswerHistory';
import { IAnswerHistoryRepository } from '../interfaces/IAnswerHistoryRepository';

export class AnswerHistoryMongoRepository implements IAnswerHistoryRepository {
    async createAnswerHistory(history: Omit<IAnswerHistory, '_id'>): Promise<IAnswerHistory> {
        const newHistory = new AnswerHistoryModel(history);
        return await newHistory.save();
    }

    async getAnswerHistoryByUser(userId: string): Promise<IAnswerHistory[]> {
        return await AnswerHistoryModel.find({ userId });
    }
}