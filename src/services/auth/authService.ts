import jwt from 'jsonwebtoken';
import { ENV } from '../../config/ENV';
import { USER_ROLES } from '../../enums/roles';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { comparePassword } from '../../config/auth';

interface TokenPayload {
  id: string;
  email: string;
  role: USER_ROLES;
}

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Generar token JWT con información del usuario incluyendo rol
   */
  generateAuthToken(payload: TokenPayload): string {
    return jwt.sign(
      {
        id: payload.id,
        email: payload.email,
        role: payload.role
      },
      ENV.JWT_SECRET!,
      {
        expiresIn: ENV.JWT_EXPIRES_IN || '7d'
      }
    );
  }

  /**
   * Validar credenciales de login
   */
  async validateLogin(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    const isValidPassword = await comparePassword(password, user.passwordHash);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  /**
   * Proceso completo de login
   */
  async login(email: string, password: string) {
    const user = await this.validateLogin(email, password);
    
    const token = this.generateAuthToken({
      id: user._id?.toString() || user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: user.toSafeObject ? user.toSafeObject() : user,
      token
    };
  }
}

export default AuthService;
