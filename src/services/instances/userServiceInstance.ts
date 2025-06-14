import { UserMongoRepository } from "../../repositories/mongodb/userRepository";
import { UserService } from "../user/userService";

export const userServiceInstance = new UserService(new UserMongoRepository());