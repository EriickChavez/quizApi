
import { AnswerHistoryMongoRepository } from "../../repositories/mongodb/AnswerHistoryMongoRepository";
import { AnswerHistoryService } from "../answerHistory/AnswerHistoryService";

export const answerHistoryServiceInstance = new AnswerHistoryService(new AnswerHistoryMongoRepository());