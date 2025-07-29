import { IUser, IUserDocument } from "../../interfaces/IUser";
import { UserModel } from "../../models/userModel";
import { IUserRepository } from "../interfaces/IUserRepository";
import { USER_ROLES } from "../../enums/roles";

export class UserMongoRepository implements IUserRepository {

  /**
   * Crear un nuevo usuario
   */
  async createUser(userData: Omit<IUser, '_id'>): Promise<IUserDocument> {
    const user = new UserModel(userData);
    return await user.save();
  }

  /**
   * Buscar usuario por email
   */
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email }).exec();
  }

  /**
   * Buscar usuario por ID
   */
  async findById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findById(id).exec();
  }

  /**
   * Actualizar usuario por ID
   */
  async updateById(id: string, updates: Partial<IUser>): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).exec();
  }

  /**
   * Buscar usuarios por rol
   */
  async findByRole(role: USER_ROLES): Promise<IUserDocument[]> {
    return await UserModel.find({ role }).exec();
  }

  /**
   * Buscar usuarios activos
   */
  async findActiveUsers(): Promise<IUserDocument[]> {
    return await UserModel.find({ isActive: true }).exec();
  }

  /**
   * Desactivar usuario
   */
  async deactivateUser(id: string): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  /**
   * Buscar usuario por token de reset (implementación futura)
   */
  async findUserByResetToken(token: string): Promise<IUserDocument | null> {
    // Implementación futura para reset de contraseña
    // return await UserModel.findOne({ 
    //   resetToken: token,
    //   resetTokenExpires: { $gt: new Date() }
    // }).exec();
    throw new Error("Method not implemented yet.");
  }

  // ==============================================
  // MÉTODOS LEGACY PARA COMPATIBILIDAD
  // ==============================================

  /**
   * @deprecated Usar findByEmail en su lugar
   */
  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return this.findByEmail(email);
  }

  /**
   * @deprecated Usar updateById en su lugar
   */
  async updateUserById(id: string, updates: Partial<IUser>): Promise<IUserDocument | null> {
    return this.updateById(id, updates);
  }
}
