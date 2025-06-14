import mongoose from 'mongoose';
import { IScore } from '../interfaces/IScore';

const ScoreSchema = new mongoose.Schema<IScore>({
    userId: String,
    quizId: String,
    sessionId: String,
    correctAnswers: Number,
    totalQuestions: Number,
    percentage: Number,
    category: String,
    difficulty: String,
    createdAt: { type: Date, default: Date.now }
});

export const ScoreModel = mongoose.model<IScore>('Score', ScoreSchema);
