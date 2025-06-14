import { IScore } from '../../interfaces/IScore';
import { IScoreRepository } from '../../repositories/interfaces/IScoreRepository';

export class ScoreService {
    constructor(private scoreRepository: IScoreRepository) { }

    async saveScore(scoreData: Omit<IScore, '_id'>): Promise<IScore> {
        return this.scoreRepository.createScore(scoreData);
    }

    async getScoresByUserId(userId: string): Promise<IScore[]> {
        return this.scoreRepository.getScoresByUserId(userId);
    }
}