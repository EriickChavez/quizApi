import { QUESTION_DIFFICULTY, QUESTION_TYPES } from "../enums/questions";
import { ICategory } from "./ICategory";


export interface IQuiz {
    id: string;
    category: ICategory[];
    question: IQuestion;
    answers: IAnswer[];
    options: IOptions;
    createdAt: Date;
}
export interface IQuestion {
    question: string;
    type: QUESTION_TYPES;
}

export interface IAnswer {
    id: string;
    answer: string;
    isCorrect: boolean;
    type: QUESTION_TYPES;
}

export interface IOptions {
    difficulty: QUESTION_DIFFICULTY;
}