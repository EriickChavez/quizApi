import mysql from "mysql2/promise";
import { IUser, IUserRepository } from "../interfaces/IUserRepository";

export class MysqlUserRepository implements IUserRepository {
  private connection: mysql.Connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async createUser(user: IUser): Promise<any> {
    const [result] = await this.connection.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [user.email, user.password]
    );
    return result;
  }

  async findUserByEmail(email: string): Promise<any> {
    const [rows] = await this.connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return (rows as any[])[0] || null;
  }

  async updateUserById(id: string, updates: Partial<IUser>): Promise<any> {
    const [result] = await this.connection.query(
      "UPDATE users SET ? WHERE id = ?",
      [updates, id]
    );
    return result;
  }

  async findUserByResetToken(token: string): Promise<any> {
    const [rows] = await this.connection.query(
      "SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > NOW()",
      [token]
    );
    return (rows as any[])[0] || null;
  }
}
