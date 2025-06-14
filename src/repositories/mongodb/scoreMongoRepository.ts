import { ScoreModel } from '../../models/ScoreModel';
import { IScore } from '../../interfaces/IScore';
import { IScoreRepository } from '../interfaces/IScoreRepository';

export class ScoreMongoRepository implements IScoreRepository {
    async createScore(scoreData: Omit<IScore, '_id'>): Promise<IScore> {
        const score = new ScoreModel(scoreData);
        return await score.save();
    }

    async getScoresByUserId(userId: string): Promise<IScore[]> {
        return await ScoreModel.find({ userId });
    }
}
