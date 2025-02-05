import { PaginationOptions, PaginatedApiResponse } from "../utils/apiResponse";
import {
  ICategory,
  ICategoryDocument,
  ICategoryRepository,
} from "./interfaces/ICategoryRepository";
import { v4 as uuidv4 } from "uuid";

export class LocalCategoryRepository implements ICategoryRepository {
  private category: ICategory[] = [];

  createCategory(category: Omit<ICategory, "id">): Promise<ICategoryDocument> {
    this.category.push({
      id: uuidv4(),
      ...category,
    });
    return Promise.resolve(category as unknown as ICategoryDocument);
  }
  updateCategory(
    id: string,
    updates: Partial<ICategory>
  ): Promise<ICategoryDocument | null> {
    const index = this.category.findIndex((q) => q.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.category[index] = { ...this.category[index], ...updates };
    return Promise.resolve(
      this.category[index] as unknown as ICategoryDocument
    );
  }
  getCategories(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  > {
    const { page, limit } = paginationOptions;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCategories = this.category.slice(start, end);
    return Promise.resolve({
      data: paginatedCategories,
      total: this.category.length,
      page,
      limit,
    });
  }
  deleteCategory(id: string): Promise<boolean | null> {
    const index = this.category.findIndex((q) => q.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.category.splice(index, 1);
    return Promise.resolve(true);
  }

  createMultiCategory(
    categories: Omit<ICategory, "id">[]
  ): Promise<ICategoryDocument[] | null> {
    const newCategories = categories.map((category) => ({
      id: uuidv4(),
      ...category,
    }));
    this.category.push(...newCategories);
    return Promise.resolve(newCategories as unknown as ICategoryDocument[]);
  }
}
