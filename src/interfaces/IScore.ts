export interface IScore {
    _id?: string;
    userId: string;
    quizId?: string;
    sessionId: string;
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
    category?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    createdAt: Date;
}
