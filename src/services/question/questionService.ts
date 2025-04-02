import {
  IQuiz,
  IQuestionRepository,
} from "../../repositories/interfaces/IQuestionRepository";
import { PaginationOptions, QuizGetWithParams } from "../../utils/apiResponse";

export class QuestionService {
  private questionRepository: IQuestionRepository;

  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async createQuestion(question: IQuiz) {
    const newQuestion = await this.questionRepository.createQuestion(question);
    return newQuestion;
  }

  async createMultiQuestion(questions: IQuiz[]) {
    const newQuestions = await this.questionRepository.createMultiQuestion(
      questions
    );
    return newQuestions;
  }

  async getQuestions(paginationOptions: PaginationOptions) {
    const questions = await this.questionRepository.getQuestions(
      paginationOptions
    );
    return questions;
  }

  async getQuestionById(id: string) {
    const question = await this.questionRepository.findQuestionById(id);
    return question;
  }

  async updateQuestion(id: string, question: IQuiz) {
    const updatedQuestion = await this.questionRepository.updateQuestionById(
      id,
      question
    );
    return updatedQuestion;
  }

  async deleteQuestion(id: string) {
    const deletedQuestion = await this.questionRepository.deleteQuestionById(
      id
    );
    return deletedQuestion;
  }

  async getQuestionsByCategory(
    paginationOptions: PaginationOptions,
    categoryId: string
  ) {
    console.log({ paginationOptions, categoryId });
    const questions = await this.questionRepository.getQuestionsByCategory(
      paginationOptions,
      categoryId
    );
    return questions;
  }

  async getQuestionsByFilter(
    params: QuizGetWithParams,
    paginationOptions: PaginationOptions,
  ) {
    const questions = await this.questionRepository.getQuestionsByFilter(
      params,
      paginationOptions
    );
    return questions;
  }
}
