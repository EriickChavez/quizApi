import { LocalQuestionRepository } from "../../repositories/questionLocalRepository";
import { QuestionService } from "../question/questionService";

// Crear una instancia del repositorio
const questionRepository = new LocalQuestionRepository();

// Crear una instancia de QuestionService con el repositorio inyectado
export const questionServiceInstance = new QuestionService(questionRepository);
