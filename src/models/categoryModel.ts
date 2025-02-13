import mongoose from "mongoose";
import { ICategoryDocument } from "../repositories/interfaces/ICategoryRepository";

export const categorySchema = new mongoose.Schema<ICategoryDocument>({
  id: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, required: false }, // Agregando el campo icon como opcional
});

export const CategorySchema = mongoose.model<ICategoryDocument>(
  "Category",
  categorySchema
);
