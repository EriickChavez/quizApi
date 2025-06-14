import { ICategory } from "../../interfaces/ICategory";

export interface ICategoryRepository {
  getAll(): Promise<ICategory[]>;
  getById(id: string): Promise<ICategory | null>;
}