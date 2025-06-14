import { IScore } from '../../interfaces/IScore';

export interface IScoreRepository {
    createScore(score: Omit<IScore, '_id'>): Promise<IScore>;
    getScoresByUserId(userId: string): Promise<IScore[]>;
}
