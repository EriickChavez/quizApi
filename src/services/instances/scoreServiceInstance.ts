import { ScoreMongoRepository } from "../../repositories/mongodb/scoreMongoRepository";
import { ScoreService } from "../score/ScoreService";

export const scoreServiceInstance = new ScoreService(new ScoreMongoRepository());