import mongoose from "mongoose";
import { IQuestionDocument } from "../repositories/interfaces/IQuestionRepository";
import { QUESTION_DIFFICULTY, QUESTION_TYPES } from "../enums/questions";
import { categorySchema } from "./categoryModel";

const questionSchema = new mongoose.Schema<IQuestionDocument>(
  {
    id: { type: String, required: true },
    category: { type: [categorySchema], required: true }, // Ahora es un array de categorías
    question: {
      question: { type: String, required: true },
      type: {
        type: String,
        enum: Object.values(QUESTION_TYPES),
        required: true,
      },
    },
    answers: [
      {
        id: { type: String, required: true },
        answer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        type: {
          type: String,
          enum: Object.values(QUESTION_TYPES),
          required: true,
        },
      },
    ],
    options: {
      difficulty: {
        type: String,
        enum: Object.values(QUESTION_DIFFICULTY),
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const QuestionSchema = mongoose.model<IQuestionDocument>(
  "Question",
  questionSchema
);
