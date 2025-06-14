import { ICategory } from "../../interfaces/ICategory";
import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";

export class CategoryService {
  constructor(private categoryRepository: ICategoryRepository) { }

  async getAllCategories(): Promise<ICategory[]> {
    return await this.categoryRepository.getAll();
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    return await this.categoryRepository.getById(id);
  }

  async createCategory(categoryData: Omit<ICategory, 'id'> & { id?: string }): Promise<ICategory> {
    return await this.categoryRepository.create(categoryData);
  }
}