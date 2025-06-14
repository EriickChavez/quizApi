import { generateToken } from '../../config/auth';
class AuthService {
  static generateAuthToken(payload: any) {
    return generateToken(payload.id);
  }
}

export default new AuthService();