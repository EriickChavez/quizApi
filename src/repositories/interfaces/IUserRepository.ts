import { IUser } from "../../interfaces/IUser";

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUserById(
    id: string,
    updates: Partial<IUser>
  ): Promise<IUser | null>;
  findUserByResetToken(token: string): Promise<IUser | null>;
}
