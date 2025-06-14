import { ICategory } from "../../interfaces/ICategory";
import { QuizModel } from "../../models/quizModel";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";


export class CategoryMongoRepository implements ICategoryRepository {
    async getAll(): Promise<ICategory[]> {
        const result = await QuizModel.aggregate([
            { $unwind: "$category" },
            { $group: { _id: "$category.id", doc: { $first: "$category" } } },
            { $replaceRoot: { newRoot: "$doc" } }
        ])
        return result;
    }

    async getById(id: string): Promise<ICategory | null> {
        return await QuizModel.findOne({ 'category.id': id }, { 'category.$': 1 });
    }
}