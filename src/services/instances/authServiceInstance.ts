import { LocalUserRepository as UserRepository } from "../../repositories/localRepository";
import { AuthService } from "../auth/authService";

// Crear una instancia del repositorio
const userRepository = new UserRepository();

// Crear una instancia de AuthService con el repositorio inyectado
export const authServiceInstance = new AuthService(userRepository);
