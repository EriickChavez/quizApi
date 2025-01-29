import {
  IQuestion,
  IQuestionRepository,
} from "../../repositories/interfaces/IQuestionRepository";
import { PaginationOptions } from "../../utils/apiResponse";

export class QuestionService {
  private questionRepository: IQuestionRepository;

  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async createQuestion(question: IQuestion) {
    const newQuestion = await this.questionRepository.createQuestion(question);
    return newQuestion;
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

  async updateQuestion(id: string, question: IQuestion) {
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
}
