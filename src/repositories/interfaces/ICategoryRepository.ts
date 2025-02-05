import { Document } from "mongoose";
import {
  PaginatedApiResponse,
  PaginationOptions,
} from "../../utils/apiResponse";

export interface ICategory {
  id: string;
  name: string;
  icon?: string;
}

// @ts-ignore
export interface ICategoryDocument extends ICategory, Document {}

export interface ICategoryRepository {
  createCategory(category: Omit<ICategory, "id">): Promise<ICategoryDocument>;
  updateCategory(
    id: string,
    updates: Partial<ICategory>
  ): Promise<ICategoryDocument | null>;
  getCategories(
    paginationOptions: PaginationOptions
  ): Promise<
    Omit<PaginatedApiResponse, "res" | "message" | "success" | "error">
  >;
  deleteCategory(id: string): Promise<boolean | null>;
  createMultiCategory(
    categories: Omit<ICategory, "id">[]
  ): Promise<ICategoryDocument[] | null>;
}
