import mongoose from 'mongoose';
import { IAnswerHistory } from '../interfaces/IAnswerHistory';

const AnswerHistorySchema = new mongoose.Schema<IAnswerHistory>({
    userId: String,
    quizId: String,
    questionId: String,
    selectedAnswerId: String,
    isCorrect: Boolean,
    timestamp: { type: Date, default: Date.now }
});

export const AnswerHistoryModel = mongoose.model('AnswerHistory', AnswerHistorySchema);
