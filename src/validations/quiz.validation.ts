import Joi from 'joi';
import { QUESTION_DIFFICULTY, QUESTION_TYPES } from '../enums/questions';

const AnswerSchema = Joi.object({
    id: Joi.string().required(),
    answer: Joi.string().required(),
    isCorrect: Joi.boolean().required(),
    type: Joi.string().valid(QUESTION_TYPES).required()
});

const QuestionSchema = Joi.object({
    question: Joi.string().required(),
    type: Joi.string().valid(QUESTION_TYPES).required()
});

const OptionsSchema = Joi.object({
    difficulty: Joi.string().valid(QUESTION_DIFFICULTY).required()
});

const CategorySchema = Joi.object({
    _id: Joi.string().required(),
    id: Joi.string().required(),
    category: Joi.string().optional(),
    icon: Joi.string().optional()
});

export const CreateQuizSchema = Joi.object({
    category: Joi.array().items(CategorySchema).required(),
    question: QuestionSchema.required(),
    answers: Joi.array().items(AnswerSchema).required(),
    options: OptionsSchema.required()
});