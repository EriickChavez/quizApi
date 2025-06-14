import { ICategory } from "../../interfaces/ICategory";
import { QuizModel } from "../../models/quizModel";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import { v4 as uuid } from 'uuid';

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

    async create(categoryData: Omit<ICategory, 'id'> & { id?: string }): Promise<ICategory> {
        const categoryToCreate: ICategory = {
            id: categoryData.id || `${uuid}`, // Generar si no viene
            category: categoryData.category,
            icon: categoryData.icon
        };

        // Guardar como parte de un quiz dummy (o puedes crear una colección separada)
        const dummyQuiz = {
            category: [categoryToCreate],
            question: {
                text: 'Dummy Question',
                type: 'text'
            },
            answers: [
                {
                    id: 'ans_001',
                    answer: 'Dummy Answer',
                    isCorrect: true,
                    type: 'text'
                }
            ],
            options: {
                difficulty: 'easy'
            }
        };

        const quiz = new QuizModel(dummyQuiz);
        await quiz.save();

        return categoryToCreate;
    }
}