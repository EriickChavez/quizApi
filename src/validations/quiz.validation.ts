import Joi from 'joi';

const AnswerSchema = Joi.object({
    id: Joi.string().required(),
    answer: Joi.string().required(),
    isCorrect: Joi.boolean().required(),
    type: Joi.string().valid('text', 'image').required()
});

const QuestionSchema = Joi.object({
    id: Joi.string().required(),
    text: Joi.string().required(),
    type: Joi.string().valid('text', 'image').required()
});

const OptionsSchema = Joi.object({
    difficulty: Joi.string().valid('easy', 'medium', 'hard').required()
});

const CategorySchema = Joi.object({
    id: Joi.string().required(),
    category: Joi.string().required(),
    icon: Joi.string().optional()
});

export const CreateQuizSchema = Joi.object({
    category: Joi.array().items(CategorySchema).required(),
    question: QuestionSchema.required(),
    answers: Joi.array().items(AnswerSchema).required(),
    options: OptionsSchema.required()
});