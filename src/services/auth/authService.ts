import crypto from "crypto";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../../config/auth";
import { v4 as uuidv4 } from "uuid";

export class AuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async signup(email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const user = await this.userRepository.createUser({
      id: uuidv4(),
      email,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString());
    return { user, token };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await this.userRepository.updateUserById(user._id.toString(), {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hora
    });

    return resetToken;
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await this.userRepository.findUserByResetToken(hashedToken);

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    const hashedPassword = await hashPassword(newPassword);
    await this.userRepository.updateUserById(user._id.toString(), {
      password: hashedPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });
  }
}
