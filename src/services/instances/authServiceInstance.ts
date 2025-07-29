import { AuthService } from "../auth/authService";
import { UserMongoRepository } from "../../repositories/mongodb/userRepository";

// Crear una instancia del repositorio
const userRepository = new UserMongoRepository();

// Crear una instancia de AuthService con el repositorio inyectado
export const authServiceInstance = new AuthService(userRepository);
