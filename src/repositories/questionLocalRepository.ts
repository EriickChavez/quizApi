import { QUESTION_DIFFICULTY, QUESTION_TYPES } from "../enums/questions";
import { PaginationOptions, PaginatedApiResponse } from "../utils/apiResponse";
import { ICategory } from "./interfaces/ICategoryRepository";
import {
  IQuiz,
  IQuestionDocument,
  IQuestionRepository,
} from "./interfaces/IQuestionRepository";
import { v4 as uuidv4 } from "uuid";

export class LocalQuestionRepository implements IQuestionRepository {
  private questions: IQuiz[] = IQUIZZES;

  createQuestion(question: Omit<IQuiz, "id">): Promise<IQuestionDocument> {
    this.questions.push({
      id: uuidv4(),
      ...question,
    });
    return Promise.resolve(question as unknown as IQuestionDocument);
  }
  createMultiQuestion(
    questions: Omit<IQuiz, "id">[]
  ): Promise<IQuestionDocument[]> {
    const newQuestions = questions.map((question) => ({
      id: uuidv4(),
      ...question,
    }));
    this.questions.push(...newQuestions);
    return Promise.resolve(newQuestions as unknown as IQuestionDocument[]);
  }
  findQuestionById(id: string): Promise<IQuestionDocument | null> {
    const question = this.questions.find((q) => q.id === id) || null;
    return Promise.resolve(question as IQuestionDocument | null);
  }
  updateQuestionById(
    id: string,
    updates: Partial<IQuiz>
  ): Promise<IQuestionDocument | null> {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.questions[index] = { ...this.questions[index], ...updates };
    return Promise.resolve(this.questions[index] as IQuestionDocument);
  }
  getQuestions(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  > {
    const { page, limit } = paginationOptions;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedQuestions = this.questions.slice(start, end);
    return Promise.resolve({
      data: paginatedQuestions,
      total: this.questions.length,
      page,
      limit,
    });
  }
  deleteQuestionById(id: string): Promise<boolean | null> {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.questions.splice(index, 1);
    return Promise.resolve(true);
  }
  getQuestionsByCategory(
    paginationOptions: PaginationOptions,
    category: string
  ): Promise<IQuestionDocument[]> {
    const { page, limit } = paginationOptions;
    const start = (page - 1) * limit;
    const end = start + limit;

    const filteredQuestions = this.questions.filter((q) =>
      questionIncludesCategory(q.category, category)
    );

    if (filteredQuestions.length > 0) {
      return Promise.resolve(
        filteredQuestions.slice(start, end) as IQuestionDocument[]
      );
    }

    return Promise.resolve([] as IQuestionDocument[]);
  }
}

const questionIncludesCategory = (
  categories: ICategory[],
  category: string
) => {
  return categories.some((c) => c.id === category);
};

const IQUIZZES: IQuiz[] = [
  {
    id: "1",
    category: [
      { id: "cat1", category: "Ciencia", icon: "🔬" },
      { id: "cat2", category: "Tecnología", icon: "💻" },
    ],
    question: {
      question: "¿Cuál es el planeta más cercano al Sol?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      {
        id: "1",
        answer: "Mercurio",
        isCorrect: true,
        type: QUESTION_TYPES.TEXT,
      },
      { id: "2", answer: "Venus", isCorrect: false, type: QUESTION_TYPES.TEXT },
      {
        id: "3",
        answer: "Tierra",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
      { id: "4", answer: "Marte", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      difficulty: QUESTION_DIFFICULTY.EASY,
    },
  },
  {
    id: "2",
    category: [
      { id: "cat3", category: "Historia", icon: "📜" },
      { id: "cat4", category: "Geografía", icon: "🌍" },
    ],
    question: {
      question: "¿En qué año llegó el hombre a la Luna?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { id: "1", answer: "1969", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { id: "2", answer: "1975", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { id: "3", answer: "1980", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { id: "4", answer: "1955", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      difficulty: QUESTION_DIFFICULTY.MEDIUM,
    },
  },
  {
    id: "3",
    category: [
      { id: "cat5", category: "Arte", icon: "🎨" },
      { id: "cat6", category: "Cultura", icon: "📚" },
    ],
    question: {
      question: "¿Quién pintó la Mona Lisa?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      {
        id: "1",
        answer: "Pablo Picasso",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
      {
        id: "2",
        answer: "Vincent van Gogh",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
      {
        id: "3",
        answer: "Leonardo da Vinci",
        isCorrect: true,
        type: QUESTION_TYPES.TEXT,
      },
      {
        id: "4",
        answer: "Claude Monet",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
    ],
    options: {
      difficulty: QUESTION_DIFFICULTY.HARD,
    },
  },
];
