import { IUser } from "../../interfaces/IUser";
import { UserModel } from "../../models/userModel";
import { IUserRepository } from "../interfaces/IUserRepository";


export class UserMongoRepository implements IUserRepository {

  async createUser(userData: Omit<IUser, '_id'>): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  updateUserById(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  findUserByResetToken(token: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
}