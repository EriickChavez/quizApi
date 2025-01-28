import { Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserRepository {
  createUser(user: IUser): Promise<IUserDocument>;
  findUserByEmail(email: string): Promise<IUserDocument | null>;
  updateUserById(
    id: string,
    updates: Partial<IUser>
  ): Promise<IUserDocument | null>;
  findUserByResetToken(token: string): Promise<IUserDocument | null>;
}
