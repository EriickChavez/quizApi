import { AnswerHistoryMongoRepository } from "../../repositories/mongodb/answerHistoryMongoRepository";
import { AnswerHistoryService } from "../answerHistory/AnswerHistoryService";

export const answerHistoryServiceInstance = new AnswerHistoryService(new AnswerHistoryMongoRepository());