export interface IAnswerHistory {
    _id?: string;
    userId: string;
    quizId: string;
    questionId: string;
    selectedAnswerId: string;
    isCorrect: boolean;
    timestamp: Date;
}
