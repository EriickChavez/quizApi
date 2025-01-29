import { QuestionRepository } from "../../repositories/mongodb/questionRepository";
import { QuestionService } from "../question/questionService";

// Crear una instancia del repositorio
const questionRepository = new QuestionRepository();

// Crear una instancia de QuestionService con el repositorio inyectado
export const questionServiceInstance = new QuestionService(questionRepository);
