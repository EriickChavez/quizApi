import { QUESTION_DIFFICULTY, QUESTION_TYPES } from "../enums/questions";
import { PaginationOptions, PaginatedApiResponse } from "../utils/apiResponse";
import { ICategory } from "./interfaces/ICategoryRepository";
import {
  IQuiz,
  IQuestionDocument,
  IQuestionRepository,
} from "./interfaces/IQuestionRepository";

export class LocalQuestionRepository implements IQuestionRepository {
  private questions: IQuiz[] = IQUIZZES;

  createQuestion(question: IQuiz): Promise<IQuestionDocument> {
    this.questions.push(question);
    return Promise.resolve(question as IQuestionDocument);
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
      { id: "cat1", name: "Ciencia", icon: "🔬" },
      { id: "cat2", name: "Tecnología", icon: "💻" },
    ],
    question: {
      question: "¿Cuál es el planeta más cercano al Sol?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "Mercurio", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "Venus", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Tierra", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Marte", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.EASY,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "2",
    category: [
      { id: "cat3", name: "Historia", icon: "📜" },
      { id: "cat4", name: "Geografía", icon: "🌍" },
    ],
    question: {
      question: "¿En qué año llegó el hombre a la Luna?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "1969", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "1975", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "1980", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "1955", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.MEDIUM,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "3",
    category: [
      { id: "cat5", name: "Arte", icon: "🎨" },
      { id: "cat6", name: "Cultura", icon: "📚" },
    ],
    question: {
      question: "¿Quién pintó la Mona Lisa?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      {
        answer: "Leonardo da Vinci",
        isCorrect: true,
        type: QUESTION_TYPES.TEXT,
      },
      { answer: "Pablo Picasso", isCorrect: false, type: QUESTION_TYPES.TEXT },
      {
        answer: "Vincent van Gogh",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
      { answer: "Claude Monet", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.EASY,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "4",
    category: [
      { id: "cat7", name: "Deportes", icon: "⚽" },
      { id: "cat8", name: "Entretenimiento", icon: "🎬" },
    ],
    question: {
      question: "¿Cuál es el deporte más popular del mundo?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "Fútbol", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "Baloncesto", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Tenis", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Voleibol", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.EASY,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "5",
    category: [
      { id: "cat9", name: "Matemáticas", icon: "🧮" },
      { id: "cat6", name: "Lógica", icon: "🤔" },
    ],
    question: {
      question: "¿Cuánto es 2 + 2?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "4", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "5", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "3", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "6", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.EASY,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "6",
    category: [
      { id: "cat11", name: "Cine", icon: "🎥" },
      { id: "cat6", name: "Series", icon: "📺" },
    ],
    question: {
      question: '¿Quién dirigió la película "El Padrino"?',
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      {
        answer: "Francis Ford Coppola",
        isCorrect: true,
        type: QUESTION_TYPES.TEXT,
      },
      {
        answer: "Martin Scorsese",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
      {
        answer: "Steven Spielberg",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
      {
        answer: "Quentin Tarantino",
        isCorrect: false,
        type: QUESTION_TYPES.TEXT,
      },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.MEDIUM,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "7",
    category: [
      { id: "cat13", name: "Música", icon: "🎵" },
      { id: "cat6", name: "Bandas", icon: "🎸" },
    ],
    question: {
      question: "¿Cuál es la banda británica más famosa de la historia?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "The Beatles", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "Queen", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Rolling Stones", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Led Zeppelin", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.MEDIUM,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "8",
    category: [
      { id: "cat15", name: "Cultura General", icon: "🌐" },
      { id: "cat16", name: "Curiosidades", icon: "🤓" },
    ],
    question: {
      question: "¿Cuál es el río más largo del mundo?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "Amazonas", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "Nilo", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Yangtsé", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "Misisipi", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.MEDIUM,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "9",
    category: [
      { id: "cat17", name: "Tecnología", icon: "💻" },
      { id: "cat18", name: "Programación", icon: "👨‍💻" },
    ],
    question: {
      question:
        "¿Qué lenguaje de programación se usa para desarrollar aplicaciones Android?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "Kotlin", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "Java", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "Python", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "C#", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.HARD,
      type: QUESTION_TYPES.TEXT,
    },
  },
  {
    id: "10",
    category: [
      { id: "cat19", name: "Ciencia", icon: "🔬" },
      { id: "cat20", name: "Biología", icon: "🧬" },
    ],
    question: {
      question: "¿Cuál es el órgano más grande del cuerpo humano?",
      type: QUESTION_TYPES.TEXT,
    },
    answers: [
      { answer: "La piel", isCorrect: true, type: QUESTION_TYPES.TEXT },
      { answer: "El hígado", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "El cerebro", isCorrect: false, type: QUESTION_TYPES.TEXT },
      { answer: "El corazón", isCorrect: false, type: QUESTION_TYPES.TEXT },
    ],
    options: {
      dificulty: QUESTION_DIFFICULTY.EASY,
      type: QUESTION_TYPES.TEXT,
    },
  },
];
