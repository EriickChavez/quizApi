import { UserRepository } from "../../repositories/MoongoDBuserRepository";
import { AuthService } from "./authService";

// Crear una instancia del repositorio
const userRepository = new UserRepository();

// Crear una instancia de AuthService con el repositorio inyectado
export const authServiceInstance = new AuthService(userRepository);
