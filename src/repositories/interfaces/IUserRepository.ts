import { IUser, IUserDocument } from "../../interfaces/IUser";
import { USER_ROLES } from "../../enums/roles";

export interface IUserRepository {
  createUser(user: Omit<IUser, '_id'>): Promise<IUserDocument>;
  findByEmail(email: string): Promise<IUserDocument | null>;
  findById(id: string): Promise<IUserDocument | null>;
  updateById(
    id: string,
    updates: Partial<IUser>
  ): Promise<IUserDocument | null>;
  findByRole(role: USER_ROLES): Promise<IUserDocument[]>;
  findActiveUsers(): Promise<IUserDocument[]>;
  deactivateUser(id: string): Promise<IUserDocument | null>;
  findUserByResetToken(token: string): Promise<IUserDocument | null>;
  
  // Métodos legacy para compatibilidad
  getUserByEmail(email: string): Promise<IUserDocument | null>;
  updateUserById(id: string, updates: Partial<IUser>): Promise<IUserDocument | null>;
}
