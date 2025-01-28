import { User } from "../models/userModel";
import {
  IUserRepository,
  IUser,
  IUserDocument,
} from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser(user: IUser): Promise<IUserDocument> {
    const newUser = new User(user);
    return await newUser.save();
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
