import { User } from "../../models/userModel";
import {
  IUserRepository,
  IUser,
  IUserDocument,
} from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser(user: IUser): Promise<IUserDocument> {
    try {
      const newUser = new User(user);
      return await newUser.save();
    } catch (error: any) {
      throw new Error("Error saving user: " + error.message);
    }
  }

  async findUserByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email });
  }

  async updateUserById(
    id: string,
    updates: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return await User.findByIdAndUpdate(id, updates, { new: true });
  }

  async findUserByResetToken(token: string): Promise<IUserDocument | null> {
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }
}
