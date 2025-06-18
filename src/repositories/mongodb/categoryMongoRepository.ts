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
    async update(id: string, categoryData: Omit<ICategory, 'id'>): Promise<ICategory | null> {
        const updatedCategory = await CategoryModel.findOneAndUpdate(
            { id },
            { category: categoryData.category, icon: categoryData.icon },
            { new: true }
        );

        return updatedCategory;
    }

    async deleteCategory(id: string): Promise<boolean> {
        const deletedItem = await CategoryModel.deleteOne({ id });
        return deletedItem.deletedCount > 0;
    }

    async createMultiCategory(categories: Omit<ICategory, 'id'>[]): Promise<ICategory[]> {
        const categoriesToSave = categories.map(category => ({
            id: `${uuid()}`,
            category: category.category,
            icon: category.icon
        }));

        const createdCategories = await CategoryModel.insertMany(categoriesToSave);
        return createdCategories;
    }
}