import mongoose from 'mongoose';
import { IQuiz } from '../interfaces/IQuiz';

const AnswerSchema = new mongoose.Schema({
  id: String,
  answer: String,
  isCorrect: Boolean,
  type: String,
});

const QuestionSchema = new mongoose.Schema({
  id: String,
  question: String,
  type: String,
});

const OptionsSchema = new mongoose.Schema({
  difficulty: String,
});

const CategorySchema = new mongoose.Schema({
  id: String,
  category: String,
  icon: String,
});

const QuizSchema = new mongoose.Schema<IQuiz>({
  id: String,
  category: [CategorySchema],
  question: QuestionSchema,
  answers: [AnswerSchema],
  options: OptionsSchema,
  createdAt: { type: Date, default: Date.now }
});

export const QuizModel = mongoose.model<IQuiz>('Quiz', QuizSchema);