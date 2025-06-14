import { IAnswerHistory } from '../../interfaces/IAnswerHistory';

export interface IAnswerHistoryRepository {
    createAnswerHistory(history: Omit<IAnswerHistory, '_id'>): Promise<IAnswerHistory>;
    getAnswerHistoryByUser(userId: string): Promise<IAnswerHistory[]>;
}
