import {
  ICategory,
  ICategoryRepository,
} from "../../repositories/interfaces/ICategoryRepository";
import { PaginationOptions } from "../../utils/apiResponse";

export class CategoryService {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(category: ICategory) {
    const newCategory = await this.categoryRepository.createCategory(category);
    return newCategory;
  }

  async getCategories(paginationOptions: PaginationOptions) {
    const categories = await this.categoryRepository.getCategories(
      paginationOptions
    );
    return categories;
  }

  async updateCategory(id: string, updates: Partial<ICategory>) {
    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      updates
    );
    return updatedCategory;
  }

  async deleteCategory(id: string) {
    const deletedCategory = await this.categoryRepository.deleteCategory(id);
    return deletedCategory;
  }

  async createMultiCategory(categories: Omit<ICategory, "id">[]) {
    const newCategories = await this.categoryRepository.createMultiCategory(
      categories
    );
    return newCategories;
  }
}
