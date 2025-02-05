import { IUser, IUserRepository } from "./interfaces/IUserRepository";
import { v4 as uuidv4 } from "uuid";

export class LocalUserRepository implements IUserRepository {
  private users: IUser[] = [];

  async createUser(user: Omit<IUser, "id">): Promise<any> {
    this.users.push({
      id: uuidv4(),
      ...user,
    });
    return user;
  }

  async findUserByEmail(email: string): Promise<any> {
    return this.users.find((user) => user.email === email) || null;
  }

  async updateUserById(id: string, updates: Partial<IUser>): Promise<any> {
    // @ts-ignore
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    Object.assign(user, updates);
    return user;
  }

  async findUserByResetToken(token: string): Promise<any> {
    return this.users.find((user) => user.resetPasswordToken === token) || null;
  }
}
