import { ICategory } from "../../interfaces/ICategory";

export interface ICategoryRepository {
  getAll(): Promise<ICategory[]>;
  getById(id: string): Promise<ICategory | null>;
  create(category: Omit<ICategory, 'id'> & { id?: string }): Promise<ICategory>;
}