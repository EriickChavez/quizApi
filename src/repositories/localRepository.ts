import { IUser, IUserRepository } from "./interfaces/IUserRepository";

export class LocalUserRepository implements IUserRepository {
  private users: IUser[] = [];

  async createUser(user: IUser): Promise<any> {
    this.users.push(user);
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
