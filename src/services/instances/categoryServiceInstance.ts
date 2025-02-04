import { LocalCategoryRepository } from "../../repositories/categoryLocalRepository";
import { CategoryService } from "../category/categoryService";

// Crear una instancia del repositorio
const categoryRepository = new LocalCategoryRepository();

// Crear una instancia de QuestionService con el repositorio inyectado
export const categoryServiceInstance = new CategoryService(categoryRepository);
