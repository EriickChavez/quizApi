import { ICategory } from "../../interfaces/ICategory";

export interface ICategoryRepository {
  getAll(): Promise<ICategory[]>;
  getById(id: string): Promise<ICategory | null>;
  create(category: Omit<ICategory, 'id'> & { id?: string }): Promise<ICategory>;
  createMultiCategory(categories: Omit<ICategory, 'id'>[]): Promise<ICategory[]>;
  update(id: string, category: Omit<ICategory, 'id'>): Promise<ICategory | null>;
  deleteCategory(id: string): Promise<boolean>;
}