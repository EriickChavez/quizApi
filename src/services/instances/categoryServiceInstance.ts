import { CategoryMongoRepository } from "../../repositories/mongodb/categoryMongoRepository";
import { CategoryService } from "../category/categoryService";

export const categoryServiceInstance = new CategoryService(new CategoryMongoRepository());