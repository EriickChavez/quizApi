import mongoose from 'mongoose';
import { ICategory } from '../interfaces/ICategory';


const CategorySchema = new mongoose.Schema<ICategory>({
  id: String,
  category: { type: String, required: true },
  icon: String
});

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);