import { QuizMongoRepository } from "../../repositories/mongodb/quizRepository";
import { QuizService } from "../quiz/quizService";

// ✅ Inyectamos el repositorio al crear el servicio
export const quizServiceInstance = new QuizService(new QuizMongoRepository());