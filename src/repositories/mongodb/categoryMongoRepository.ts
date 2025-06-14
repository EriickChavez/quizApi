import { ICategory } from "../../interfaces/ICategory";
import { CategoryModel } from "../../models/categoryModel";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import { v4 as uuid } from 'uuid';

export class CategoryMongoRepository implements ICategoryRepository {
    async getAll(): Promise<ICategory[]> {
        const res = await CategoryModel.find();
        return res;
    }

    async getById(id: string): Promise<ICategory | null> {
        return await CategoryModel.findOne({ id });
    }

    async create(categoryData: Omit<ICategory, 'id'> & { id?: string }): Promise<ICategory> {
        const categoryToSave: ICategory = {
            id: categoryData.id || `${uuid()}`,
            category: categoryData.category,
            icon: categoryData.icon
        };

        const categoryDoc = new CategoryModel(categoryToSave);
        await categoryDoc.save();

        return categoryToSave;
    }
}