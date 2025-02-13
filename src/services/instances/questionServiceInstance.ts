import { LocalQuestionRepository } from "../../repositories/questionLocalRepository";
import { QuestionService } from "../question/questionService";
import { QuestionRepository } from "../../repositories/mongodb/questionRepository";

// Crear una instancia del repositorio
const questionRepository = new QuestionRepository();
// const questionRepository = new LocalQuestionRepository();

// Crear una instancia de QuestionService con el repositorio inyectado
export const questionServiceInstance = new QuestionService(questionRepository);
