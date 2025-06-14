import { generateToken } from '../../config/auth';
class AuthService {
  constructor() { }
  generateAuthToken(payload: any) {
    return generateToken(payload.id);
  }
}

export default AuthService;